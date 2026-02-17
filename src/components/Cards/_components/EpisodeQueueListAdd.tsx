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
// 1. Import Tooltip from Hero UI
import { Tooltip } from "@heroui/react";
import { BiAddToQueue } from "react-icons/bi";
import { MdRemoveFromQueue } from "react-icons/md";

interface EpisodeQueueListAddProps {
	episodeData: PodcastEpisode;
	className?: string;
}

const EpisodeQueueListAdd = ({
	episodeData,
	className,
}: EpisodeQueueListAddProps) => {
	const [isQueued, setIsQueued] = useState(false);
	const queryClient = useQueryClient();
	const episodeId = episodeData?.id;

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
			staleTime: Infinity,
			refetchOnWindowFocus: true,
		},
	);

	const EpisodeStatusData: EpisodeType = episodeStatusData?.data;

	useEffect(() => {
		if (EpisodeStatusData) {
			setIsQueued(EpisodeStatusData.is_queued);
		}
	}, [EpisodeStatusData]);

	// const addQueueMutation = useMutation(
	// 	() => APICall(addToQueue, [episodeId], true, false),
	// 	{
	// 		onSuccess: () => {
	// 			queryClient.invalidateQueries(["episode-status", episodeId]);
	// 			queryClient.invalidateQueries("queue-list");
	// 		},
	// 	},
	// );

	// const removeQueueMutation = useMutation(
	// 	() => APICall(removeQueue, [episodeId], true, false),
	// 	{
	// 		onSuccess: () => {
	// 			queryClient.invalidateQueries(["episode-status", episodeId]);
	// 			queryClient.invalidateQueries("queue-list");
	// 		},
	// 	},
	// );

	const toggleQueue = () => {
		if (isQueued) {
			setIsQueued(false);
			// removeQueueMutation.mutate();
		} else {
			setIsQueued(true);
			// addQueueMutation.mutate();
		}
	};

	return (
		// 2. Wrap the button with Hero UI Tooltip
		<Tooltip
			content={isQueued ? "In Your Queue" : "Add to Queue"}
			placement='top'
			showArrow
			closeDelay={0}
			// 3. Technical styling (Zinc + Mono/Uppercase)
			classNames={{
				base: ["before:bg-zinc-800"], // Arrow color
				content: [
					"py-1.5 px-3 shadow-xl",
					"text-[10px] font-black uppercase tracking-widest",
					"text-white bg-zinc-900",
					"border border-white/10 rounded-lg",
				],
			}}
			// 4. Snappy spring animation
			motionProps={{
				variants: {
					exit: { opacity: 0, transition: { duration: 0.1 } },
					enter: { opacity: 1, transition: { duration: 0.1 } },
				},
			}}
		>
			<button
				onClick={toggleQueue}
				aria-label={isQueued ? "Remove from playlist" : "Add to playlist"}
				className='group relative outline-none flex items-center justify-center shrink-0'
			>
				{/* Socket Container */}
				<div
					className={`
				relative size-11 flex items-center justify-center rounded-full border transition-all duration-500
				${
					isQueued
						? "border-primary-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-primary-500/5"
						: "border-white/50 hover:border-white/20"
				} ${className}
			`}
				>
					<AnimatePresence mode='wait'>
						{isQueued ? ( // Use your state variable here (e.g., isQueued or isInPlaylist)
							<motion.div
								key='active'
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.5, opacity: 0 }}
								className='text-primary-500'
							>
								{/* --- THE QUEUE ICON --- */}
								<BiAddToQueue className='text-xl' />
							</motion.div>
						) : (
							<motion.div
								key='inactive'
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								className='text-white/60 group-hover:text-white'
							>
								{/* --- THE INACTIVE QUEUE ICON --- */}
								<MdRemoveFromQueue className='text-xl' />
							</motion.div>
						)}
					</AnimatePresence>

					{/* Hardware Reflection Effect */}
				</div>
			</button>
		</Tooltip>
	);
};

export default EpisodeQueueListAdd;
