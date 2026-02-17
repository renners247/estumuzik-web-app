"use client";
import { FaCheck, FaPlus } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import Picture from "../picture/Index";
import React, { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import GlobalLoader from "../reusables/GlobalLoader";
import {
	getPodcastStatus,
	getUserStatus,
	subscribeToPodcast,
	unsubscribeFromPodcast,
} from "../utils/endpoints";
import { useQuery, useQueryClient } from "react-query";
import { APICall } from "../utils/extra";
import { Tooltip } from "@heroui/react";
import { RiShareLine } from "react-icons/ri";

const TopJollyCard = ({ podcast }: { podcast: TopJollyPodcast }) => {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const [following, setFollowing] = React.useState(false);
	const queryClient = useQueryClient();
	const podcastId = podcast.id;

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

	//  const newFollowing = !following;
	//   setFollowing(newFollowing); // Optimistic update

	//   try {
	//     if (newFollowing) {
	//       await APICall(subscribeToPodcast, [podcastId, {}], false, true);
	//     } else {
	//       await APICall(unsubscribeFromPodcast, [podcastId, {}], false, true);
	//     }
	//     queryClient.invalidateQueries(["podcastStatus", podcastId]);
	//   } catch (err) {
	//     setFollowing(!newFollowing); // Revert on error
	//     console.log("Follow toggle failed", err);
	//   }
	// };

	const toggleFollow = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!podcastId) return;

		const newFollowing = !following;
		setFollowing(newFollowing); // Optimistic update

		try {
			if (newFollowing) {
				await APICall(subscribeToPodcast, [podcastId, {}], false, true);
			} else {
				await APICall(unsubscribeFromPodcast, [podcastId, {}], false, true);
			}
			queryClient.invalidateQueries(["podcastStatus", podcastId]);
		} catch (err) {
			setFollowing(!newFollowing); // Revert on error
			console.log("Follow toggle failed", err);
		}
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
			<div className='flex flex-col w-[200px] sm:w-[240px] shrink-0 group cursor-pointer bg-[#1A1A1A] p-3 rounded-2xl hover:bg-[#222] transition-colors'>
				{/* Cover Image */}
				<div className='relative aspect-square w-full rounded-xl overflow-hidden mb-3'>
					<Picture
						src={podcast.picture_url || "/placeholder.png"}
						alt={podcast.title}
						className='object-cover h-full w-full transition-transform duration-500 group-hover:scale-105'
					/>
				</div>

				{/* Details */}
				<div className='flex flex-col gap-1 mb-4 h-[52px]'>
					<h3
						onClick={() =>
							startTransition(() => {
								router.push(`/podcast/${podcast?.id}`);
							})
						}
						className='text-white font-bold text-base hover:text-primary-300 transition-[.3] leading-tight line-clamp-1'
					>
						{podcast.title}
					</h3>
					<p className='text-gray-400 text-xs truncate'>
						By:{" "}
						{podcast.author ||
							`${podcast.publisher?.first_name} ${podcast.publisher?.last_name}`}
					</p>
				</div>

				{/* Actions */}
				<div className='flex items-center gap-2 mt-auto'>
					<button
						onClick={toggleFollow}
						className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-full text-xs font-bold transition-all duration-200
            ${
							following
								? "bg-primary-500 text-white"
								: "bg-white/10 text-gray-300 hover:bg-white/20"
						}`}
					>
						{following ? <FaCheck size={10} /> : <FaPlus size={10} />}
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

export default TopJollyCard;
