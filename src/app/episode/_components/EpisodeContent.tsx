"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiUser, FiShare2, FiStar } from "react-icons/fi";

import PlayButton from "@/components/actions/PlayButton";
import Picture from "@/components/picture/Index";
import GlobalLoader from "@/components/reusables/GlobalLoader";
import { formatDateYMD, formatDuration } from "@/components/utils/constants";
import {
	BaseUrl,
	getEpisode,
	getEpisodeComments,
} from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import { BackButton } from "@/components/utils/function";

import Comment from "./Comment";
import EpisodeQueueListAdd from "@/components/Cards/_components/EpisodeQueueListAdd";
import EpisodeFavouriteFunc from "@/components/episodefunctions/EpisodeFavouriteFunc";
import { RiShareLine } from "react-icons/ri";
import { Modal, ModalContent, Tooltip, useDisclosure } from "@heroui/react";
import EpisodePlayListAdd from "@/components/Cards/_components/EpisodePlayListAdd";
import AddToPlaylistModal from "@/components/Modal/AddToPlaylistModal";

interface EpisodeContentProps {
	episodeId: string;
}

const CommentSkeleton = () => {
	return (
		<div className='flex gap-4 p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-xl animate-pulse'>
			{/* Avatar Skeleton */}
			<div className='flex-shrink-0'>
				<div className='w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700' />
			</div>

			{/* Content Skeleton */}
			<div className='flex-1 min-w-0 space-y-3'>
				{/* Header with name and date */}
				<div className='flex items-center justify-between gap-2'>
					<div className='h-4 w-32 bg-zinc-800 rounded' />
					<div className='h-3 w-20 bg-zinc-800 rounded' />
				</div>

				{/* Comment body skeleton - multiple lines */}
				<div className='space-y-2'>
					<div className='h-3 w-full bg-zinc-800 rounded' />
					<div className='h-3 w-5/6 bg-zinc-800 rounded' />
					<div className='h-3 w-4/6 bg-zinc-800 rounded' />
				</div>

				{/* Footer with action buttons */}
				<div className='mt-3 flex items-center gap-4'>
					<div className='h-3 w-12 bg-zinc-800 rounded' />
					<div className='h-3 w-12 bg-zinc-800 rounded' />
					<div className='h-3 w-24 bg-zinc-800 rounded ml-auto' />
				</div>
			</div>
		</div>
	);
};

const EpisodeContent = ({ episodeId }: EpisodeContentProps) => {
	const [shareOpen, setShareOpen] = useState(false);

	const {
		isOpen: isOpenAddToPlaylistModal,
		onOpen: onOpenAddToPlaylistModal,
		onOpenChange: onOpenChangeAddToPlaylistModal,
	} = useDisclosure();

	const { data: episodeData, isLoading: episodeIsLoading } = useQuery(
		["episode", episodeId],
		async () => {
			const response = await APICall(getEpisode, [episodeId], false, false);
			return response.data.data;
		},
		{ staleTime: Infinity },
	);

	const { data: episodeCommentsData, isLoading: episodeCommentsIsLoading } =
		useQuery(
			["episode-comments", episodeId],
			async () => {
				const response = await APICall(
					getEpisodeComments,
					[episodeId],
					false,
					false,
				);
				return response.data.data;
			},
			{ staleTime: Infinity },
		);

	const EpisodeData: PodcastEpisode = episodeData?.data;
	const EpisodeCommentsData: EpisodeComment[] = episodeCommentsData?.data?.data;

	const fullUrl = `${BaseUrl}/$episodeId}`;

	if (episodeIsLoading) return <GlobalLoader isPending={true} />;

	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: EpisodeData?.title,
					text: EpisodeData?.description,
					url: fullUrl,
				});
			} catch (err) {
				console.log("Share cancelled");
			}
		}
	};

	return (
		<>
			<main className='min-h-screen text-white overflow-x-hidden space-y-4'>
				{EpisodeData?.id && (
					<div className='relative w-full'>
						{/* 1. CINEMATIC BACKGROUND LAYER */}
						<div className='absolute top-0 left-0 w-full h-[70vh] overflow-hidden'>
							<div
								className='w-full h-full bg-cover bg-center scale-110 blur-2xl opacity-30 transition-all duration-1000'
								style={{ backgroundImage: `url(${EpisodeData?.picture_url})` }}
							/>
							<div className='absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]' />
						</div>

						<div className='relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-8 pb-20'>
							{/* 2. HERO CONTENT GRID */}
							<div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 '>
								{/* LEFT: THE COMPONENT (IMAGE) */}
								<div className='lg:col-span-4 sticky top-32'>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										className='relative group aspect-square lg:max-w-[400px] mx-auto'
									>
										<div className='absolute inset-0 bg-blue-600/20 blur-[60px] rounded-full group-hover:bg-blue-600/30 transition-all duration-700' />
										<Picture
											src={EpisodeData?.picture_url || ""}
											alt={EpisodeData?.title}
											className='relative z-10 w-full h-full object-cover rounded-[2.5rem] border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]'
										/>
									</motion.div>
								</div>

								{/* RIGHT: THE SPECS (METADATA) */}
								<div className='lg:col-span-8 flex flex-col space-y-8'>
									{/* TITLE & AUTHOR */}
									<div className='space-y-4'>
										<div className='flex gap-x-2 items-center'>
											<BackButton className='bg-zinc-900/50 border border-white/10 backdrop-blur-md rounded-xl p-2 hover:bg-zinc-800 transition-all' />
											<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-600/10 border border-primary-500/20 text-primary-200 text-[10px] font-black uppercase tracking-widest'>
												{EpisodeData?.podcast?.category_name}
											</div>
										</div>
										<h1 className='text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-white uppercase'>
											{EpisodeData?.title}
										</h1>
										<div className='flex items-center gap-3 group'>
											<p className='text-zinc-400 font-bold uppercase tracking-widest text-xs lg:text-sm'>
												By:{" "}
												<span className='text-white'>
													{EpisodeData?.podcast?.author}
												</span>
											</p>
										</div>
									</div>

									{/* DATA SOCKETS (Metadata Grid) */}
									<div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
										<div className='bg-zinc-900/50 border border-white/5 p-4 rounded-2xl'>
											<div className='text-white font-mono text-sm'>
												{formatDateYMD(EpisodeData?.created_at)}
											</div>
										</div>
										<div className='bg-zinc-900/50 border border-white/5 p-4 rounded-2xl'>
											<div className='text-white font-mono text-sm'>
												{formatDuration(EpisodeData?.duration)}
											</div>
										</div>
									</div>

									{/* MASTER PLAY ACTION */}
									<div className='pt-6 flex flex-col sm:flex-row items-center gap-6'>
										<PlayButton
											episode={EpisodeData && EpisodeData}
											className='grid place-items-center text-white bg-primary-700 rounded-full p-2 size-fit'
										/>

										<EpisodeFavouriteFunc episodeData={EpisodeData} />
										<EpisodeQueueListAdd episodeData={EpisodeData} />
										<EpisodePlayListAdd
											episodeData={EpisodeData}
											onOpenAddToPlaylistModal={onOpenAddToPlaylistModal}
										/>
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

									{/* DESCRIPTION BOX */}
									<div className='mt-8 p-6 bg-zinc-900/30 rounded-[2rem] border border-white/5 text-zinc-400 text-sm leading-relaxed'>
										<h4 className='text-white font-bold mb-3 uppercase text-[10px] tracking-[0.2em]'>
											Summary
										</h4>
										<div
											dangerouslySetInnerHTML={{
												__html:
													EpisodeData?.description ||
													"No description provided.",
											}}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				<div className='space-y-4'>
					{episodeCommentsIsLoading ? (
						<p className='text-white'>Loading...</p>
					) : EpisodeCommentsData && EpisodeCommentsData?.length > 0 ? (
						EpisodeCommentsData?.map((comment) => (
							<Comment user={comment?.user} comment={comment} />
						))
					) : (
						<p className='text-white'>No comments found</p>
					)}
				</div>
			</main>

			<Modal
				isOpen={isOpenAddToPlaylistModal}
				onOpenChange={onOpenChangeAddToPlaylistModal}
				size='md'
				backdrop='opaque'
				// isDismissable={false}
				// hideCloseButton={true}
				classNames={{
					closeButton: "z-50",
				}}
			>
				<ModalContent className='bg-black-500'>
					{(onClose) => (
						<AddToPlaylistModal episode={EpisodeData} onClose={onClose} />
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default EpisodeContent;
