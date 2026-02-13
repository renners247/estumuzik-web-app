"use client";
import React from "react";
import { FaHeart, FaPlay, FaPause } from "react-icons/fa"; // Added FaPause
import { MdPlaylistAdd } from "react-icons/md";
import { RiShareLine } from "react-icons/ri";
import { AiOutlinePlus } from "react-icons/ai";
import Picture from "@/components/picture/Index";
import { useAppDispatch, useAppSelector } from "@/components/Hooks";
import { playPause, setActiveSong } from "@/components/Redux/playerOne";
import { setIsEpisodeRegistered } from "@/components/Redux/ToggleModal";

// ... (PodcastEpisode interface remains the same)

interface PodcastProps {
	data: PodcastEpisode;
	index: number; // Added to track position in list
	allEpisodes: PodcastEpisode[]; // Added to provide player queue
}

const PodcastCard = ({ data, index, allEpisodes }: PodcastProps) => {
	const dispatch = useAppDispatch();
	const { activeSong, isPlaying, isLoading } = useAppSelector(
		(state) => state.playerOne,
	);

	// Helpers
	const episodeThumbnail = data.picture_url;
	const podcastCover =
		data.podcast.cover_picture_url || data.podcast.picture_url;
	const category = data.podcast.category_name;

	// Check if THIS specific card is the one playing
	const isCurrentActiveSong = activeSong?.id === data.id;

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = () => {
		// If it's already the active song but was paused, just resume
		if (isCurrentActiveSong) {
			dispatch(playPause(true));
		} else {
			// Otherwise, load this new song and its context (allEpisodes)
			dispatch(
				setActiveSong({
					song: data,
					data: allEpisodes,
					index: index,
				}),
			);
		}
		// Reset modal states if necessary
		dispatch(setIsEpisodeRegistered(false));
	};

	return (
		<div className='relative w-full max-w-[340px] bg-mtn-dark-gradient rounded-[32px] overflow-hidden shadow-2xl group transition-all duration-300 hover:scale-[1.02] border border-white/5'>
			{/* 1. Background Image Overlay */}
			<div className='absolute top-0 left-0 w-full h-3/5 opacity-50 z-0'>
				<Picture
					src={podcastCover}
					alt={data.podcast.title}
					className='w-full h-full object-cover grayscale-[30%]'
				/>
				<div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#062c1b]/40 to-[#0a1a12]'></div>
			</div>

			<div className='relative z-10 p-5 flex flex-col'>
				{/* Brand Header */}
				<div className='flex justify-center items-center mb-4 pt-2 opacity-80'>
					<div className='flex flex-col items-center'>
						<div className='flex gap-[2px]'>
							<div className='w-3 h-8 bg-gray-300 -skew-x-12'></div>
							<div className='w-3 h-8 bg-gray-300 -skew-x-12'></div>
						</div>
					</div>
					<div className='ml-3 text-white text-[10px] font-bold leading-tight uppercase tracking-tighter'>
						{data.podcast.author || "Change Africa"} <br /> Podcast
					</div>
				</div>

				{/* 3. Overlapping Thumbnail with Play/Pause Button */}
				<div className='relative size-32 mx-auto lg:mx-0 mb-6 mt-4 shadow-2xl'>
					<Picture
						src={episodeThumbnail}
						alt={data.title}
						className='w-full h-full object-cover rounded-2xl border-2 border-white/10'
					/>

					<div className='absolute inset-0 flex items-center justify-center'>
						{/* Show Spinner if this song is loading, else show Play/Pause */}
						{isLoading && isCurrentActiveSong ? (
							<div className='size-12 rounded-full border-4 border-white/20 border-t-primary-500 animate-spin' />
						) : (
							<button
								onClick={
									isCurrentActiveSong && isPlaying
										? handlePauseClick
										: handlePlayClick
								}
								className='bg-primary-500 size-12 grid place-items-center rounded-full text-white shadow-[0_0_20px_rgba(255,204,0,0.4)] hover:scale-110 transition-transform cursor-pointer group-hover:bg-primary-400'
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

				{/* 4. Text Content Section */}
				<div className='flex flex-col gap-1.5 mb-5'>
					<span className='text-gray-400 text-xs font-semibold uppercase tracking-wider'>
						{category}
					</span>
					<h3 className='text-white font-bold text-lg leading-tight tracking-wide line-clamp-1'>
						{data.title}
					</h3>
					<p className='text-gray-400 text-xs line-clamp-3 leading-relaxed font-normal opacity-80'>
						{data.description}
					</p>
				</div>

				{/* 5. Action Buttons */}
				<div className='flex items-center gap-3.5'>
					<button className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 transition-all'>
						<FaHeart size={16} />
					</button>
					<button className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 transition-all'>
						<MdPlaylistAdd size={22} />
					</button>
					<button className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 transition-all'>
						<RiShareLine size={20} />
					</button>
					<button className='size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 transition-all'>
						<AiOutlinePlus size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default PodcastCard;
