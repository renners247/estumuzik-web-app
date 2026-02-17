"use client";

import React, { useEffect, useState } from "react";
import { FaPlay, FaPause, FaPlus, FaCheck } from "react-icons/fa6";
import Picture from "../picture/Index";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { playPause, setActiveSong } from "../Redux/playerOne";
import { setIsEpisodeRegistered } from "../Redux/ToggleModal";
import { useQuery, useQueryClient } from "react-query";
import { APICall } from "../utils/extra";
import {
	getPodcastStatus,
	getUserStatus,
	subscribeToPodcast,
	unsubscribeFromPodcast,
} from "../utils/endpoints";

interface HandpickedCardProps {
	episode: PodcastEpisode;
	allEpisodes: PodcastEpisode[];
	index: number;
}

const HandpickedCard = ({
	episode,
	allEpisodes,
	index,
}: HandpickedCardProps) => {
	const dispatch = useAppDispatch();
	const { activeSong, isPlaying, isLoading } = useAppSelector(
		(state) => state.playerOne,
	);
	const [following, setFollowing] = useState(false);
	const queryClient = useQueryClient();

	const podcastId = episode?.podcast?.id;

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
				await APICall(subscribeToPodcast, [podcastId, {}], true, false);
			} else {
				await APICall(unsubscribeFromPodcast, [podcastId, {}], true, false);
			}
			queryClient.invalidateQueries(["podcastStatus", podcastId]);
		} catch (err) {
			setFollowing(!newFollowing); // Revert on error
			console.log("Follow toggle failed", err);
		}
	};

	// Check if THIS specific card is the one playing
	const isCurrentActiveSong = activeSong?.id === episode.id;

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
					data: allEpisodes,
					index: index,
				}),
			);
		}
		dispatch(setIsEpisodeRegistered(false));
	};

	const userId = episode?.podcast?.user_id;

	return (
		<div className='bg-[#1A1A1A] p-4 rounded-xl flex flex-col gap-4 group hover:bg-[#222] transition-colors cursor-pointer'>
			{/* Podcast Image */}
			<div className='w-full aspect-square rounded-lg overflow-hidden relative'>
				<Picture
					src={episode.podcast?.picture_url || episode.picture_url}
					alt={episode.podcast?.title || episode.title}
					className='object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500'
				/>
			</div>

			{/* Details */}
			<div className='flex flex-col gap-1'>
				<h3 className='text-white font-bold text-lg line-clamp-1'>
					{episode.podcast?.title || episode.title}
				</h3>
				<p className='text-gray-400 text-sm'>
					By: {episode.podcast?.author || "Unknown Author"}
				</p>
			</div>

			{/* Description */}
			<p className='text-gray-400 text-sm line-clamp-3 leading-relaxed h-[60px]'>
				{episode.podcast?.description || episode.description}
			</p>

			{/* Actions */}
			<div className='flex items-center gap-3 mt-auto pt-2'>
				<button
					onClick={toggleFollow}
					className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all
            ${
							following
								? "bg-primary-500 text-white"
								: "bg-white/10 text-gray-300 hover:bg-white/20"
						}`}
				>
					{following ? <FaCheck /> : <FaPlus />}
					{following ? "Following" : "Follow"}
				</button>

				<button
					onClick={
						isCurrentActiveSong && isPlaying
							? handlePauseClick
							: handlePlayClick
					}
					className='flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold bg-primary-500 text-white hover:bg-primary-600 transition-all'
				>
					{isLoading && isCurrentActiveSong ? (
						<div className='size-3 border-2 border-white/20 border-t-white rounded-full animate-spin' />
					) : isCurrentActiveSong && isPlaying ? (
						<FaPause />
					) : (
						<FaPlay />
					)}
					{isCurrentActiveSong && isPlaying ? "Pause" : "Play"}
				</button>

				<span className='ml-auto text-gray-500 text-xs font-medium'>
					{Math.ceil(episode.duration / 60)} Mins
				</span>
			</div>
		</div>
	);
};

export default HandpickedCard;
