"use client";

import React from "react";
import { useQuery } from "react-query";
import { getHandPicked } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import HandpickedCard from "@/components/Cards/HandpickedCard";
import { Skeleton } from "@heroui/react";

const Handpicked = () => {
	const { data: handpickedData, isLoading } = useQuery(
		["handpicked"],
		async () => {
			const response = await APICall(getHandPicked, [4], false, false); // Fetch 4 items
			return response?.data?.data?.data;
		},
		{
			staleTime: 1000 * 60 * 5,
		},
	);

	const handpickedEpisodes: PodcastEpisode[] = handpickedData?.data || [];

	return (
		<div className='space-y-6 mt-10'>
			{/* Header */}
			<div className='flex flex-col gap-1 px-2'>
				<h2 className='text-2xl font-bold text-white tracking-tight flex items-center gap-2'>
					<span>🔥</span> Handpicked for you
				</h2>
				<p className='text-gray-400 text-sm'>Podcasts you’d love</p>
			</div>

			{/* Grid */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2'>
				{isLoading
					? Array.from({ length: 3 }).map((_, i) => (
							<div
								key={i}
								className='bg-[#1A1A1A] p-4 rounded-xl flex flex-col gap-4'
							>
								<Skeleton className='w-full aspect-square rounded-lg bg-white/5' />
								<div className='flex flex-col gap-2'>
									<Skeleton className='h-6 w-3/4 rounded bg-white/5' />
									<Skeleton className='h-4 w-1/2 rounded bg-white/5' />
								</div>
								<Skeleton className='h-20 w-full rounded bg-white/5' />
								<div className='flex gap-3 mt-auto pt-2'>
									<Skeleton className='h-9 w-24 rounded-full bg-white/5' />
									<Skeleton className='h-9 w-24 rounded-full bg-white/5' />
								</div>
							</div>
						))
					: handpickedEpisodes.map((episode, index) => (
							<HandpickedCard
								key={episode.id}
								episode={episode}
								allEpisodes={handpickedEpisodes}
								index={index}
							/>
						))}
			</div>
		</div>
	);
};

export default Handpicked;
