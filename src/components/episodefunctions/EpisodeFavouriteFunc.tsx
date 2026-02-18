"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { APICall } from "../utils/extra";
import {
	addFavorite,
	getEpisodeStatus,
	removeFromFavorites,
} from "../utils/endpoints";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
// 1. Import Tooltip from Hero UI
import { Tooltip } from "@heroui/react";

interface EpisodeFavouriteFuncProps {
	episodeData: PodcastEpisode;
	className?: string;
}

const EpisodeFavouriteFunc = ({
	episodeData,
	className,
}: EpisodeFavouriteFuncProps) => {
	const [isFavourite, setIsFavourite] = useState(false);
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
			setIsFavourite(EpisodeStatusData.is_favourite);
		}
	}, [EpisodeStatusData]);

	const addFavoriteMutation = useMutation(
		() => APICall(addFavorite, [episodeId], true, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("favorite-list");
			},
		},
	);

	const removeFavoriteMutation = useMutation(
		() => APICall(removeFromFavorites, [episodeId], true, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("favorite-list");
			},
		},
	);

	const toggleFavorite = () => {
		if (isFavourite) {
			setIsFavourite(false);
			removeFavoriteMutation.mutate();
		} else {
			setIsFavourite(true);
			addFavoriteMutation.mutate();
		}
	};

	return (
		// 2. Wrap the button with Hero UI Tooltip
		<Tooltip
			content={isFavourite ? "Unlike Episode" : "Like Episode"}
			placement='top'
			showArrow
			closeDelay={0}
			// 3. Technical styling for the tooltip
			classNames={{
				base: ["before:bg-zinc-800"], // Arrow color
				content: [
					"py-1.5 px-3 shadow-xl",
					"text-[10px] font-black uppercase tracking-widest",
					"text-white bg-zinc-900",
					"border border-white/10 rounded-lg",
				],
			}}
			// 4. Snappy spring animation for the tooltip
			motionProps={{
				variants: {
					exit: { opacity: 0, transition: { duration: 0.1 } },
					enter: { opacity: 1, transition: { duration: 0.1 } },
				},
			}}
		>
			<button
				onClick={toggleFavorite}
				aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
				className='group relative outline-none flex items-center justify-center shrink-0'
			>
				{/* Socket Container */}
				<div
					className={`
				relative size-9 sm:size-11 flex items-center justify-center rounded-full border  transition-all duration-500
			${className}	${
				isFavourite
					? "border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
					: "border-white/50 hover:border-white/20"
			}
			`}
				>
					<AnimatePresence mode='wait'>
						{isFavourite ? (
							<motion.div
								key='active'
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.5, opacity: 0 }}
								className='text-red-500'
							>
								<RiHeartFill className='text-xl' />
							</motion.div>
						) : (
							<motion.div
								key='inactive'
								initial={{ scale: 0.8, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.8, opacity: 0 }}
								className='text-white/60 hover:text-white/80'
							>
								<RiHeartLine className='text-xl' />
							</motion.div>
						)}
					</AnimatePresence>

					{/* Hardware Reflection Effect */}
				</div>
			</button>
		</Tooltip>
	);
};

export default EpisodeFavouriteFunc;
