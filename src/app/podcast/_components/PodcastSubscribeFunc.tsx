"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { motion, AnimatePresence } from "framer-motion";
import { RiRssFill, RiCheckLine, RiLoader4Line } from "react-icons/ri";

import {
	getPodcastsStatus,
	subscribeToPodcast,
	unsubscribeFromPodcast,
} from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";

interface PodcastSubscribeFuncProps {
	podcastDataId: number;
}

const PodcastSubscribeFunc = ({ podcastDataId }: PodcastSubscribeFuncProps) => {
	const queryClient = useQueryClient();
	const [isSubscribed, setIsSubscribed] = useState(false);

	// 1. FETCH CURRENT STATUS
	const { data: podcastStatusData, isLoading: isStatusLoading } = useQuery(
		["podcast-status", podcastDataId],
		async () => {
			const response = await APICall(
				getPodcastsStatus,
				[podcastDataId],
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

	const isSubscribedPodcastStatusData: boolean =
		podcastStatusData?.data?.is_subscribed;
	// Sync server state to local state
	useEffect(() => {
		if (podcastStatusData) {
			setIsSubscribed(isSubscribedPodcastStatusData);
		}
	}, [isSubscribedPodcastStatusData]);

	// 2. MUTATIONS
	const subscribeMutation = useMutation(
		() => APICall(subscribeToPodcast, [podcastDataId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["podcast-status", podcastDataId]);
				queryClient.invalidateQueries("subscribed-podcasts");
			},
		},
	);

	const unsubscribeMutation = useMutation(
		() => APICall(unsubscribeFromPodcast, [podcastDataId], false, false),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(["podcast-status", podcastDataId]);
				queryClient.invalidateQueries("subscribed-podcasts");
			},
		},
	);

	const handleToggleSubscription = () => {
		if (isSubscribed) {
			setIsSubscribed(false);
			unsubscribeMutation.mutate();
		} else {
			setIsSubscribed(true);
			subscribeMutation.mutate();
		}
	};

	const isPending =
		subscribeMutation.isLoading || unsubscribeMutation.isLoading;

	return (
		<button
			onClick={handleToggleSubscription}
			disabled={isStatusLoading}
			className={`
                relative flex-1 lg:flex-none h-12 lg:h-14 px-8 
                rounded-2xl font-black uppercase tracking-[0.15em] text-xs
                transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 overflow-hidden
                ${
									isSubscribed
										? "bg-green-700 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
										: "bg-primary-600 text-white shadow-lg shadow-primary-400/30 hover:bg-primary-500"
								}
                ${isStatusLoading ? "opacity-50 cursor-not-allowed" : ""}
            `}
		>
			{/* Background Hardware Shine */}
			{!isSubscribed && (
				<div className='absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none' />
			)}

			<AnimatePresence mode='wait'>
				{isPending ? (
					<motion.div
						key='loading'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<RiLoader4Line className='animate-spin text-xl' />
					</motion.div>
				) : isSubscribed ? (
					<motion.div
						key='subscribed'
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className='flex items-center gap-2'
					>
						<span>Subscribed</span>
					</motion.div>
				) : (
					<motion.div
						key='subscribe'
						initial={{ y: 10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						className='flex items-center gap-2'
					>
						<span>Subscribe</span>
					</motion.div>
				)}
			</AnimatePresence>
		</button>
	);
};

export default PodcastSubscribeFunc;
