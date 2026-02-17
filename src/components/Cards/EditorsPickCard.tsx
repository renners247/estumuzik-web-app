"use client";

import React, { useState, useTransition } from "react";
import { FaPlay, FaPause, FaPlus, FaCheck } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import Picture from "../picture/Index";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { playPause, setActiveSong } from "../Redux/playerOne";
import { setIsEpisodeRegistered } from "../Redux/ToggleModal";
import { useRouter } from "next/navigation";
import GlobalLoader from "../reusables/GlobalLoader";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
	getPodcastStatus,
	subscribeToPodcast,
	unsubscribeFromPodcast,
} from "../utils/endpoints";
import { APICall } from "../utils/extra";
import { RiShareLine } from "react-icons/ri";
import { Tooltip } from "@heroui/react";

interface EditorsPickCardProps {
	episode: PodcastEpisode;
}

const EditorsPickCard = ({ episode }: EditorsPickCardProps) => {
	const dispatch = useAppDispatch();
	const { activeSong, isPlaying, isLoading } = useAppSelector(
		(state) => state.playerOne,
	);
	const [following, setFollowing] = useState(false);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const queryClient = useQueryClient();

	const podcastId = episode.podcast_id || episode.podcast?.id;

	// Fetch Follow Status
	const { data: podcastStatus } = useQuery(
		["podcastStatus", podcastId],
		async () => {
			const response = await APICall(getPodcastStatus, podcastId, false, false);
			return response?.data?.data?.data;
		},
		{
			enabled: !!podcastId,
			onSuccess: (data) => {
				if (data && typeof data.is_subscribed === "boolean") {
					setFollowing(data.is_subscribed);
				}
			},
		},
	);

	// Toggle Follow/Unfollow
	const toggleFollow = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!podcastId) return;

		const newFollowing = !following;
		setFollowing(newFollowing); // Optimistic update

		try {
			if (newFollowing) {
				await APICall(subscribeToPodcast, [podcastId, {}], false, true);
			} else {
				await APICall(unsubscribeFromPodcast, [podcastId, {}], false, true);
			}
			queryClient.invalidateQueries(["podcastStatus", podcastId]);
		} catch (err) {
			setFollowing(!newFollowing); // Revert on error
			console.log("Follow toggle failed", err);
		}
	};

	// Check if THIS specific card is the one playing
	const isCurrentActiveSong = activeSong?.id === episode.id;

	const handleCardClick = () => {
		startTransition(() => {
			router.push(`/episode/${episode.id}`);
		});
	};

	const handlePauseClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(playPause(false));
	};

	const handlePlayClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (isCurrentActiveSong) {
			dispatch(playPause(true));
		} else {
			dispatch(
				setActiveSong({
					song: episode,
					data: [episode], // Creating a single-item playlist context
					index: 0,
				}),
			);
		}
		dispatch(setIsEpisodeRegistered(false));
	};

	const handleNativeShare = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const fullUrl = `${window.location.origin}/episode/${episode.id}`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: episode.title,
					text: episode.description,
					url: fullUrl,
				});
			} catch (err) {
				console.log("Share cancelled");
			}
		} else {
			// Fallback or just log as requested, but copying is better UX
			try {
				await navigator.clipboard.writeText(fullUrl);
				// alert("Link copied to clipboard!"); // Optional
				console.log("Link copied to clipboard");
			} catch (err) {
				console.log("Failed to copy link");
			}
		}
	};

	return (
		<div className='w-full bg-bg-500 rounded-2xl p-4 sm:p-6 flex flex-row gap-4 md:gap-8 items-center md:items-start group transition-colors border border-white/5'>
			{/* Image Section */}
			<div className='relative shrink-0 w-[120px] sm:w-[180px] md:w-[220px] aspect-square rounded-xl overflow-hidden shadow-lg'>
				<Picture
					src={
						episode.picture_url ||
						episode.podcast?.picture_url ||
						"/placeholder.png"
					}
					alt={episode.title}
					className='object-cover w-full h-full'
				/>
				{/* Play Overlay */}
				<div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
					<button
						onClick={
							isCurrentActiveSong && isPlaying
								? handlePauseClick
								: handlePlayClick
						}
						className='bg-primary-500 size-10 md:size-14 grid place-items-center rounded-full text-white shadow-[0_0_20px_rgba(0,194,122,0.4)] hover:scale-110 transition-transform'
					>
						{isLoading && isCurrentActiveSong ? (
							<div className='size-5 md:size-6 border-2 border-white/20 border-t-white rounded-full animate-spin' />
						) : isCurrentActiveSong && isPlaying ? (
							<FaPause className='text-lg md:text-xl' />
						) : (
							<FaPlay className='text-lg md:text-xl ml-0.5 md:ml-1' />
						)}
					</button>
				</div>
			</div>

			{/* Content Section */}
			<div className='flex flex-col gap-2 md:gap-3 w-full text-left'>
				<div className='flex flex-col gap-1'>
					<div className='flex items-center gap-2 mb-1'>
						{episode.podcast?.picture_url && (
							<div className='size-5 rounded-full overflow-hidden'>
								<Picture
									src={episode.podcast.picture_url}
									className='w-full h-full object-cover'
									alt={episode.podcast.title}
								/>
							</div>
						)}
						<p className='text-gray-400 text-xs font-medium uppercase tracking-wide'>
							{episode.podcast?.title || "Podcast"}
						</p>
					</div>

					<h3
						onClick={handleCardClick}
						className='text-white font-bold text-lg md:text-2xl leading-tight line-clamp-2 hover:text-primary-500 transition-colors cursor-pointer'
					>
						{episode.title}
					</h3>
					<p className='text-gray-400 text-xs md:text-sm font-medium'>
						By:{" "}
						<span className='text-gray-300'>
							{episode.podcast?.author || "Unknown"}
						</span>
					</p>
				</div>

				<p className='text-gray-400 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-4 max-w-2xl hidden sm:block'>
					{episode.description}
				</p>
				{/* Mobile description clamp is shorter/potentially hidden if space is tight, or just 2 lines */}
				<p className='text-gray-400 text-xs leading-relaxed line-clamp-2 sm:hidden'>
					{episode.description}
				</p>

				{/* Action Buttons */}
				<div className='flex items-center gap-3 mt-1 md:mt-2'>
					<button
						onClick={toggleFollow}
						className={`flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all
              ${
								following
									? "bg-primary-500 text-white"
									: "bg-white/10 text-gray-300 hover:bg-white/20"
							}`}
					>
						{following ? <FaCheck /> : <FaPlus />}
						{following ? "Following" : "Follow"}
					</button>

					<Tooltip
						content='Share Episode'
						placement='top'
						showArrow
						closeDelay={0}
						// Technical styling (Zinc + Industrial Typography)
						classNames={{
							base: ["before:bg-zinc-800"], // Arrow color
							content: [
								"py-1.5 px-3 shadow-xl",
								"text-[10px] font-black uppercase tracking-widest",
								"text-white bg-zinc-900",
								"border border-white/10 rounded-lg",
							],
						}}
						// Snappy spring animation
						motionProps={{
							variants: {
								exit: { opacity: 0, transition: { duration: 0.1 } },
								enter: { opacity: 1, transition: { duration: 0.1 } },
							},
						}}
					>
						<button
							onClick={handleNativeShare}
							className='relative size-11 flex items-center justify-center rounded-full border border-white/40 hover:bg-white/10 text-white/60 hover:text-white hover:border-white/50 transition-all shrink-0 active:scale-95'
						>
							{/* The Icon */}
							<RiShareLine className='text-xl transition-transform ' />

							{/* Hardware Reflection Effect */}

							{/* Subtle Hover Glow */}
						</button>
					</Tooltip>
				</div>
			</div>

			<GlobalLoader isPending={isPending} />
		</div>
	);
};

export default EditorsPickCard;
