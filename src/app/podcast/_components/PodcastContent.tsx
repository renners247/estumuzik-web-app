"use client";
import React from "react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import {
	FiUsers,
	FiCalendar,
	FiTag,
	FiRss,
	FiShare2,
	FiInfo,
} from "react-icons/fi";
import Link from "next/link";

import {
	BaseUrl,
	getPodcast,
	getPodcastsStatus,
} from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import Picture from "@/components/picture/Index";
import GlobalLoader from "@/components/reusables/GlobalLoader";
import { BackButton } from "@/components/utils/function";
import { formatDateYMD } from "@/components/utils/constants";
import EpisodePodcastList from "./EpisodePodcastList";
import PodcastSubscribeFunc from "./PodcastSubscribeFunc";
import { RiShareLine } from "react-icons/ri";
import { Tooltip } from "@heroui/react";

interface PodcastContentProps {
	PodcastId: string;
}

const PodcastContent = ({ PodcastId }: PodcastContentProps) => {
	const { data: podcastData, isLoading: podcastIsLoading } = useQuery(
		["podcast", PodcastId],
		async () => {
			const response = await APICall(getPodcast, [PodcastId], false, false);
			return response.data.data;
		},
		{ staleTime: Infinity },
	);

	const PodcastData: PodcastType = podcastData?.data;

	const fullUrl = `${BaseUrl}/podcast/${PodcastId}`;

	if (podcastIsLoading) return <GlobalLoader isPending={true} />;

	const handleNativeShare = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title: PodcastData?.title,
					text: PodcastData?.description,
					url: fullUrl,
				});
			} catch (err) {
				// console.log("Share cancelled");
			}
		}
	};

	return (
		<main className='min-h-screen text-white pb-32'>
			{PodcastData?.id && (
				<div className='relative w-full'>
					{/* 1. CINEMATIC COVER BANNER */}
					<div className='relative w-full h-[30vh] lg:h-[35vh] overflow-hidden'>
						<div
							className='w-full h-full bg-cover bg-center transition-transform duration-[2s] hover:scale-105'
							style={{
								backgroundImage: `url(${PodcastData?.cover_picture_url || PodcastData?.picture_url})`,
							}}
						/>
						{/* Hardware Overlay Gradients */}
						<div className='absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent' />
						<div className='absolute inset-0 bg-black-100/20 backdrop-blur-[2px]' />

						{/* Back Button Overlay */}
						<div className='absolute top-8 left-6 lg:left-12 z-20'>
							<BackButton className='bg-zinc-900/50 border border-white/10 backdrop-blur-md rounded-xl p-2 hover:bg-zinc-800 transition-all' />
						</div>
					</div>

					{/* 2. PROFILE & IDENTITY SECTION */}
					<div className='relative z-10 max-w-[1440px] mx-auto px-2 lg:px-12 -mt-24 lg:-mt-32'>
						<div className='flex flex-col lg:flex-row items-end gap-6 lg:gap-10'>
							{/* The Component (Avatar) */}
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								className='relative flex-shrink-0'
							>
								<div className='absolute inset-0 bg-blue-600/30 blur-[40px] rounded-lg lg:rounded-full' />
								<Picture
									src={PodcastData?.picture_url}
									alt={PodcastData?.title}
									className='relative z-10 size-40 lg:size-56 rounded-[2.5rem] border-4 border-[#050505] shadow-2xl object-cover'
								/>
							</motion.div>

							{/* Identity Specs */}
							<div className='flex-1 pb-4 space-y-3 w-full'>
								<div className='flex flex-wrap items-center gap-3'>
									<span className='px-3 py-1 rounded-lg lg:rounded-full bg-primary-600/10 border border-primary-500/20 text-primary-400 text-[10px] font-black uppercase tracking-widest'>
										{PodcastData?.category_name}
									</span>
								</div>

								<h1 className='text-2xl lg:text-7xl font-black leading-tight tracking-tighter text-white uppercase'>
									{PodcastData?.title}
								</h1>

								<div className='flex items-center gap-4 text-zinc-400'>
									<p className='font-bold uppercase tracking-[0.2em] text-xs lg:text-sm'>
										Authorized by:{" "}
										<span className='text-white'>{PodcastData?.author}</span>
									</p>
								</div>
							</div>

							{/* Action Socket */}
							<div className='flex gap-3 pb-4 w-full lg:w-auto'>
								<PodcastSubscribeFunc podcastDataId={PodcastData?.id} />

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

						{/* 3. TECHNICAL SPECS GRID (Metadata) */}
						<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-12'>
							<div className='bg-zinc-900/30 border border-white/5 p-6 rounded-md lg:rounded-[2rem] backdrop-blur-sm'>
								<div className='flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase mb-2'>
									Subscribers
								</div>
								<div className='text-2xl font-mono font-bold text-white'>
									{PodcastData?.subscriber_count?.toLocaleString() || "0"}
								</div>
							</div>
							<div className='bg-zinc-900/30 border border-white/5 p-6 rounded-md lg:rounded-[2rem] backdrop-blur-sm'>
								<div className='flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase mb-2'>
									Established
								</div>
								<div className='text-xl font-mono font-bold text-white'>
									{formatDateYMD(PodcastData?.created_at)}
								</div>
							</div>
							<div className='bg-zinc-900/30 border border-white/5 p-6 rounded-md lg:rounded-[2rem] backdrop-blur-sm'>
								<div className='flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase mb-2'>
									Classification
								</div>
								<div className='text-xl font-mono font-bold text-white truncate'>
									{PodcastData?.category_type}
								</div>
							</div>
							<div className='bg-zinc-900/30 border border-white/5 p-6 rounded-md lg:rounded-[2rem] backdrop-blur-sm'>
								<div className='flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase mb-2'>
									Frequency
								</div>
								<div className='text-xl font-mono font-bold text-white'>
									Weekly
								</div>
							</div>
						</div>

						{/* 4. DESCRIPTION & CONTENT */}
						<div className='mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12'>
							<div className='lg:col-span-8 space-y-8'>
								<EpisodePodcastList podcastId={PodcastId} />
								<div className='p-8 bg-zinc-900/20 rounded-[2.5rem] border border-white/5 relative overflow-hidden'>
									<h4 className='text-white font-black uppercase text-xs tracking-[0.3em] mb-6 flex items-center gap-3'>
										Summary
									</h4>

									<div
										className='text-zinc-400 leading-relaxed text-sm lg:text-base space-y-4'
										dangerouslySetInnerHTML={{
											__html:
												PodcastData?.description || "No description provided.",
										}}
									/>
								</div>
							</div>

							{/* Sidebar Specs */}
							<div className='lg:col-span-4 space-y-6'>
								<div className='p-6 bg-zinc-900/50 rounded-md lg:rounded-[2rem] border border-white/5'>
									<h5 className='text-white font-bold text-xs uppercase mb-6'>
										Publisher
									</h5>
									<div className='flex items-center gap-4'>
										<div className='size-12 rounded-xl bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden'>
											{PodcastData?.publisher?.profile_image_url ? (
												<img
													src={PodcastData.publisher.profile_image_url}
													className='object-cover'
												/>
											) : (
												<FiUsers className='text-zinc-500' />
											)}
										</div>
										<div>
											<div className='text-white font-bold text-sm'>
												{PodcastData?.publisher?.company_name ||
													`${PodcastData?.publisher?.first_name} ${PodcastData?.publisher?.last_name}`}
											</div>
											<div className='text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1'>
												Verified Provider
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	);
};

export default PodcastContent;
