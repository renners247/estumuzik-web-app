"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "@heroui/react";
import GoBack from "../../_components/GoBack";
import { APICall } from "@/components/utils/extra";
import { getRecentlyPlayed } from "@/components/utils/endpoints";
import RecentlyPlayedCard from "@/components/Cards/RecentlyPlayedCard";

const RecentlyPlayed = () => {
	const [perPage, setPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalRecentlyPlayed, setTotalRecentlyPlayed] = useState(null);

	const { data: recentlyPlayedData, isLoading } = useQuery(
		["recently-played", currentPage, perPage],
		async () => {
			const response = await APICall(
				getRecentlyPlayed,
				[currentPage, perPage],
				false,
				false,
			);
			const total = response?.data?.data?.data?.total;
			setTotalRecentlyPlayed(total);
			console.log("total: ", totalRecentlyPlayed);
			return response?.data?.data?.data;
		},
		{
			// staleTime: 1000 * 60 * 5,
		},
	);

	const recentlyPlayedEpisodes: PodcastEpisode[] = recentlyPlayedData?.data;

	return (
		<div className='space-y-6 mt-10'>
			{/* Header */}
			<div className='space-y-8'>
				<GoBack />
				<div className='flex flex-col gap-1 px-2'>
					<h2 className='text-2xl font-bold text-white tracking-tight flex items-center gap-2'>
						Your Recently Played Episodes
					</h2>
				</div>
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
					: recentlyPlayedEpisodes.map((episode, index) => (
							<RecentlyPlayedCard
								key={episode.id}
								episode={episode}
								allEpisodes={recentlyPlayedEpisodes}
								index={index}
							/>
						))}
			</div>
			{totalRecentlyPlayed && totalRecentlyPlayed > perPage && (
				<div className='flex justify-center mt-8'>
					<div className='flex gap-2'>
						{Array.from({
							length: Math.ceil(totalRecentlyPlayed / perPage),
						}).map((_, index) => (
							<button
								key={index}
								className={`w-8 h-8 rounded-full flex items-center justify-center ${
									currentPage === index + 1
										? "bg-primary-500 text-white"
										: "bg-gray-700 text-gray-300"
								}`}
								onClick={() => setCurrentPage(index + 1)}
							>
								{index + 1}
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default RecentlyPlayed;
