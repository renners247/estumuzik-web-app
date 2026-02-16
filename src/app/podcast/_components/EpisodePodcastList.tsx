"use client";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { ScrollShadow, Spinner } from "@heroui/react";
import { useInView } from "react-intersection-observer";
import {
	RiPlayFill,
	RiTimeLine,
	RiCalendarLine,
	RiHistoryLine,
} from "react-icons/ri";

import { episodePodcast } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import Picture from "@/components/picture/Index";
import { formatDuration, formatDateYMD } from "@/components/utils/constants";
import PlayButton from "@/components/actions/PlayButton";
import EpisodeFavouriteFunc from "@/components/episodefunctions/EpisodeFavouriteFunc";
import { useAppDispatch, useAppSelector } from "@/components/Hooks";
import { playPause, setActiveSong } from "@/components/Redux/playerOne";
import { setIsEpisodeRegistered } from "@/components/Redux/ToggleModal";
import { FaPause, FaPlay } from "react-icons/fa";

interface EpisodePodcastListProps {
	podcastId: string;
}

const EpisodePodcastList = ({ podcastId }: EpisodePodcastListProps) => {
	const { ref, inView } = useInView();
	const dispatch = useAppDispatch();
	const {
		activeSong,
		isPlaying,
		isLoading: songIsplaying,
	} = useAppSelector((state) => state.playerOne);
	// 1. INFINITE QUERY LOGIC
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery(
			["podcast-episodes-infinite", podcastId],
			async ({ pageParam = 1 }) => {
				// matches your endpoint: podcastId, page, per_page, q
				const response = await APICall(
					episodePodcast,
					[podcastId, pageParam, 15, ""],
					false,
					false,
				);
				return response.data.data?.data; // This returns the object containing .data (array) and pagination info
			},
			{
				getNextPageParam: (lastPage) => {
					// logic based on your JSON structure: current_page vs last_page
					return lastPage.current_page < lastPage.last_page
						? lastPage.current_page + 1
						: undefined;
				},
			},
		);

	// Trigger fetch when observer is in view
	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	// Flatten all pages of episodes into one array
	const allEpisodes: PodcastEpisode[] =
		data?.pages.flatMap((page) => {
			return page.data;
		}) || [];

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	return (
		<div className='w-full space-y-6'>
			{/* HEADER BLOCK */}
			<div className='flex items-center justify-between border-b border-white/5 pb-4'>
				<h3 className='text-xl font-black uppercase tracking-tighter text-white flex items-center gap-3'>
					Available Episodes
				</h3>
			</div>

			{/* 2. HERO UI SCROLL SHADOW CONTAINER */}
			<ScrollShadow
				// hideScrollBar
				className='h-[600px] w-full pr-2' // Fixed height for vertical infinite scroll
				size={60}
				offset={0}
			>
				<div className='flex flex-col gap-3'>
					{allEpisodes?.map((episode, index) => {
						const isCurrentActiveSong = activeSong?.id === episode?.id;

						const handlePlayClick = () => {
							// If it's already the active song but was paused, just resume
							if (isCurrentActiveSong) {
								dispatch(playPause(true));
							} else {
								// Otherwise, load this new song and its context (allEpisodes)
								dispatch(
									setActiveSong({
										song: episode,
										data: allEpisodes,
										index: index,
									}),
								);
							}
							// Reset modal states if necessary
							dispatch(setIsEpisodeRegistered(false));
						};
						return (
							<div
								key={episode?.id}
								className='group relative flex items-center gap-4 p-4 rounded-[1.5rem] bg-zinc-900/20 border border-white/5 hover:border-primary-300/30 hover:bg-zinc-900/40 transition-all duration-300'
							>
								{/* Technical Index */}
								<div className='hidden sm:block text-[10px] font-mono text-zinc-700 w-fit'>
									{String(index + 1).padStart(2, "0")}
								</div>

								{/* Thumbnail */}
								<div className='relative size-16 shrink-0 overflow-hidden rounded-2xl border border-white/5'>
									<Picture
										src={episode?.picture_url}
										alt={episode?.title}
										className='size-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
									/>
								</div>

								{/* Metadata Section */}
								<div className='flex-1 min-w-0'>
									<div className='flex items-center gap-3 mb-1'>
										<div className='flex items-center gap-1 text-zinc-500 text-[9px] font-black uppercase tracking-widest'>
											{formatDateYMD(episode?.created_at)}
										</div>
										<div className='flex items-center gap-1 text-zinc-500 text-[9px] font-black uppercase tracking-widest'>
											{formatDuration(episode?.duration)}
										</div>
									</div>
									<h4 className='text-white text-sm font-bold truncate tracking-tight group-hover:text-primary-400 transition-colors'>
										{episode?.title}
									</h4>
								</div>

								{/* Interaction Socket */}
								<div className='flex items-center gap-3'>
									<EpisodeFavouriteFunc episodeData={episode} />
									{isLoading && isCurrentActiveSong ? (
										<div className='size-12 rounded-full border-4 border-white/20 border-t-primary-500 animate-spin' />
									) : (
										<button
											onClick={
												isCurrentActiveSong && isPlaying
													? handlePauseClick
													: handlePlayClick
											}
											className='bg-primary-500 size-11 grid place-items-center rounded-full text-white shadow-[0_0_20px_rgba(255,204,0,0.4)] hover:scale-110 transition-transform cursor-pointer group-hover:bg-primary-400'
										>
											{isCurrentActiveSong && isPlaying ? (
												<FaPause className='text-lg' />
											) : (
												<FaPlay className='text-lg ml-1' />
											)}
										</button>
									)}
								</div>
							</div>
						);
					})}

					{/* 3. INFINITE LOADING TARGET */}
					<div
						ref={ref}
						className='py-10 flex flex-col items-center justify-center gap-4'
					>
						{isFetchingNextPage || isLoading ? (
							<>
								<Spinner size='sm' color='primary' labelColor='primary' />
								<p className='text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] animate-pulse'>
									Fetching Data Packets
								</p>
							</>
						) : !hasNextPage && allEpisodes.length > 0 ? (
							<div className='text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] border-t border-white/5 pt-4 w-full text-center'>
								End of Broadcast Manifest
							</div>
						) : null}
					</div>
				</div>
			</ScrollShadow>
		</div>
	);
};

export default EpisodePodcastList;
