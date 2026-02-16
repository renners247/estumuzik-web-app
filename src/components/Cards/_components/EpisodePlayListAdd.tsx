"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { motion, AnimatePresence } from "framer-motion";
import { APICall } from "@/components/utils/extra";
import {
	addToQueue,
	getEpisodeStatus,
	removeQueue,
} from "@/components/utils/endpoints";
import { RiPlayList2Fill, RiPlayListAddLine } from "react-icons/ri";

interface EpisodePlayListAddProps {
	episodeData: PodcastEpisode;
	className?: string;
}

const EpisodePlayListAdd = ({
	episodeData,
	className,
}: EpisodePlayListAddProps) => {
	const [isQueued, setIsQueued] = useState(false);
	const queryClient = useQueryClient();
	const episodeId = episodeData?.id;

	// 1. FETCH STATUS (Reusing the same status endpoint)
	const { data: episodeStatusData } = useQuery(
		["episode-status", episodeId],
		async () => {
			const response = await APICall(
				getEpisodeStatus,
				[episodeId],
				false,
				false,
			);
			return response?.data?.data;
		},
		{
			staleTime: 6000,
			refetchOnWindowFocus: true,
		},
	);

	// Using the same interface structure as Favourite
	const EpisodeStatusData: EpisodeType = episodeStatusData?.data;

	// 2. SYNC LOCAL STATE
	useEffect(() => {
		if (EpisodeStatusData) {
			setIsQueued(EpisodeStatusData.is_queued);
		}
	}, [EpisodeStatusData]);

	// 3. MUTATIONS
	const addQueueMutation = useMutation(
		() => APICall(addToQueue, [episodeId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("queue-list");
			},
		},
	);

	const removeQueueMutation = useMutation(
		() => APICall(removeQueue, [episodeId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("queue-list");
			},
		},
	);

	// 4. HANDLER
	const toggleQueue = () => {
		if (isQueued) {
			setIsQueued(false);
			removeQueueMutation.mutate();
		} else {
			setIsQueued(true);
			addQueueMutation.mutate();
		}
	};

	return (
		<button
			onClick={toggleQueue}
			aria-label={isQueued ? "Remove from playlist" : "Add to playlist"}
			className='relative outline-none'
		>
			{/* Socket Container */}
			<div
				className={`
				relative size-11 flex items-center justify-center rounded-full border transition-all duration-500
				${
					isQueued
						? "border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-blue-500/5"
						: "border-white/50 hover:border-white/20"
				} ${className}
			`}
			>
				<AnimatePresence mode='wait'>
					{isQueued ? (
						<motion.div
							key='active'
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.5, opacity: 0 }}
							className='text-blue-500'
						>
							<RiPlayList2Fill className='text-xl' />
						</motion.div>
					) : (
						<motion.div
							key='inactive'
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className='text-white/60 hover:text-white/80'
						>
							<RiPlayListAddLine className='text-xl' />
						</motion.div>
					)}
				</AnimatePresence>

				{/* Hardware Reflection Effect */}
				<div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-full pointer-events-none' />
			</div>

			{/* Tooltip */}
			<span className='absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5'>
				{isQueued ? "In Queue" : "Add to Queue"}
			</span>
		</button>
	);
};

export default EpisodePlayListAdd;
