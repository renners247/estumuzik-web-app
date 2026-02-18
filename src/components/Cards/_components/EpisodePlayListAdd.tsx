"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "@heroui/react";
import {
	RiPlayListAddFill,
	RiPlayListLine,
	RiPlayListAddLine,
} from "react-icons/ri";

import { APICall } from "@/components/utils/extra";
import {
	getEpisodeStatus,
	// Ensure these endpoints exist in your endpoints file
	addToPlaylist,
	removeFromPlaylist,
	getPlaylists,
} from "@/components/utils/endpoints";

interface EpisodePlayListAddProps {
	episodeData: PodcastEpisode;
	className?: string;
	onOpenAddToPlaylistModal?: () => void;
}

const EpisodePlayListAdd = ({
	episodeData,
	className,
	onOpenAddToPlaylistModal,
}: EpisodePlayListAddProps) => {
	const [isInPlaylist, setIsInPlaylist] = useState(false);
	const queryClient = useQueryClient();
	const playlistId = episodeData?.id;
	const episodeId = episodeData?.id;
	const [perPage, setPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [totalPlaylists, setTotalPlaylists] = useState(null);

	// 1. FETCH STATUS
	const { data: playlistsData, isLoading } = useQuery(
		["playlists", currentPage, perPage, searchQuery],
		async () => {
			const response = await APICall(
				getPlaylists,
				[currentPage, perPage, searchQuery],
				false,
				false,
			); // Fetch 3 items
			const total = response?.data?.data?.data?.total;
			setTotalPlaylists(total);
			return response?.data?.data?.data;
		},
		{
			// staleTime: 1000 * 60 * 5,
		},
	);

	const playlists: Playlist[] = playlistsData?.data;

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

	// 2. SYNC STATE (Assuming your API returns is_in_playlist or similar)
	useEffect(() => {
		if (EpisodeStatusData) {
			// Change this to your specific key for playlists
			setIsInPlaylist(EpisodeStatusData.is_played);
		}
	}, [EpisodeStatusData]);

	// 3. MUTATIONS
	const addPlaylistMutation = useMutation(
		() => APICall(addToPlaylist, [episodeId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("playlist-episodes");
			},
		},
	);

	const removePlaylistMutation = useMutation(
		() => APICall(removeFromPlaylist, [episodeId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["episode-status", episodeId]);
				queryClient.invalidateQueries("playlist-episodes");
			},
		},
	);

	// 4. HANDLER
	const togglePlaylist = () => {
		if (isInPlaylist) {
			setIsInPlaylist(false);
			removePlaylistMutation.mutate();
		} else {
			setIsInPlaylist(true);
			addPlaylistMutation.mutate();
		}
	};

	return (
		<>
			{/* <h3 className='text-white'>{isInPlaylist ? "isplay" : "none"}</h3> */}

			<Tooltip
				content={isInPlaylist ? "Added to Playlist" : "Add to Playlist"}
				placement='top'
				showArrow
				closeDelay={0}
				classNames={{
					base: ["before:bg-zinc-800"],
					content: [
						"py-1.5 px-3 shadow-xl",
						"text-[10px] font-black uppercase tracking-widest",
						"text-white bg-zinc-900",
						"border border-white/10 rounded-lg",
					],
				}}
				motionProps={{
					variants: {
						exit: { opacity: 0, transition: { duration: 0.1 } },
						enter: { opacity: 1, transition: { duration: 0.1 } },
					},
				}}
			>
				<button
					onClick={onOpenAddToPlaylistModal}
					aria-label={isInPlaylist ? "Remove from playlist" : "Add to playlist"}
					className='relative outline-none flex items-center justify-center shrink-0'
				>
					{/* Socket Container */}

					<div
						className={`
                        relative size-9 sm:size-11 flex items-center justify-center rounded-full border transition-all duration-500
                        ${
													isInPlaylist
														? "border-primary-500/40 shadow-[0_0_20px_rgba(59,130,246,0.15)] bg-primary-500/5"
														: "border-white/60 hover:border-white/20"
												} ${className}
                    `}
					>
						<AnimatePresence mode='wait'>
							{isInPlaylist ? (
								<motion.div
									key='active'
									initial={{ scale: 0.5, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.5, opacity: 0 }}
									className='text-primary-500'
								>
									<RiPlayListAddFill className='text-xl' />
								</motion.div>
							) : (
								<motion.div
									key='inactive'
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.8, opacity: 0 }}
									className='text-white/60'
								>
									<RiPlayListAddLine className='text-xl' />
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</button>
			</Tooltip>
		</>
	);
};

export default EpisodePlayListAdd;
