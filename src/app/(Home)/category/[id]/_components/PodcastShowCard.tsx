"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { ndlShowFollow, ndlShowFollowing } from "../../../../../../public";
import Picture from "@/components/picture/Index";
import GlobalLoader from "@/components/reusables/GlobalLoader";
import { useQuery, useQueryClient } from "react-query";
import {
	getPodcastStatus,
	subscribeToPodcast,
	unsubscribeFromPodcast,
} from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import { Tooltip } from "@heroui/react";
import { RiShareLine } from "react-icons/ri";

export interface PodcastShow {
	id: number;
	title: string;
	author: string;
	category_name: string;
	picture_url: string;
	subscriber_count: number;
	description: string;
}

interface PodcastShowCardProps {
	podcast: PodcastShow;
	isFollowing?: boolean;
}

const PodcastShowCard = ({
	podcast,
	isFollowing = false,
}: PodcastShowCardProps) => {
	const router = useRouter();

	const [isPending, startTransition] = useTransition();
	const [following, setFollowing] = useState(false);
	const queryClient = useQueryClient();

	const podcastId = podcast?.id;

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

	const handleCardClick = () => {
		startTransition(() => {
			router.push(`/podcast/${podcast.id}`);
		});
	};

	const handleNativeShare = async (e: React.MouseEvent) => {
		e.stopPropagation();
		const fullUrl = `${window.location.origin}/podcast/${podcast.id}`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: podcast.title,
					text: podcast.description,
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
		<>
			<div
				onClick={handleCardClick}
				className='flex flex-col w-full group cursor-pointer relative'
			>
				{/* Show Cover */}
				<div className='relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#1A1A1A]'>
					<Picture
						src={podcast.picture_url || "/placeholder.png"}
						alt={podcast.title}
						className='object-cover w-full h-full transition-transform duration-500 group-hover:scale-105'
					/>
				</div>

				{/* Show Details */}
				<div className='flex flex-col gap-1 mb-3'>
					<h3 className='text-white font-bold text-lg leading-tight line-clamp-1 group-hover:text-[#FFCC00] transition-colors'>
						{podcast.title}
					</h3>
					<p className='text-gray-400 text-sm line-clamp-1'>
						By: {podcast.author}
					</p>
				</div>

				{/* Action Buttons */}
				<div className='flex items-center gap-3 mt-auto'>
					<button
						onClick={toggleFollow}
						className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${
							following
								? "bg-primary-500 text-white"
								: "bg-white/10 text-gray-300 hover:bg-white/20"
						}`}
					>
						{following ? <FaCheck size={12} /> : <FaPlus size={12} />}
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
		</>
	);
};

export default PodcastShowCard;
