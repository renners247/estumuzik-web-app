"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { APICall } from "../utils/extra";
import {
	addFavorite,
	getEpisodeStatus,
	removeFromFavorites,
} from "../utils/endpoints";
import { RiHeartFill, RiHeartLine } from "react-icons/ri"; // Sleeker tech icons
import { motion, AnimatePresence } from "framer-motion";

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

	// 1. FETCH STATUS
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
	const EpisodeStatusData: EpisodeType = episodeStatusData?.data;

	// 2. SYNC LOCAL STATE WITH SERVER DATA
	useEffect(() => {
		if (EpisodeStatusData) {
			setIsFavourite(EpisodeStatusData.is_favourite);
		}
	}, [EpisodeStatusData]);

	// 3. MUTATIONS
	const addFavoriteMutation = useMutation(
		() => APICall(addFavorite, [episodeId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("favorite-list"); // Clear cache for favorites page
			},
		},
	);

	const removeFavoriteMutation = useMutation(
		() => APICall(removeFromFavorites, [episodeId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("favorite-list");
			},
		},
	);

	// 4. HANDLERS (With Optimistic UI updates)
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
		<button
			onClick={toggleFavorite}
			aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
			className='group relative outline-none'
		>
			{/* Socket Container */}
			<div
				className={`
				relative size-11 flex items-center justify-center rounded-full border  transition-all duration-500
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
				<div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none' />
			</div>

			{/* Tooltip (Desktop only) */}
			<span className='absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-800 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5'>
				{isFavourite ? "Saved" : "Save Episode"}
			</span>
		</button>
	);
};

export default EpisodeFavouriteFunc;
