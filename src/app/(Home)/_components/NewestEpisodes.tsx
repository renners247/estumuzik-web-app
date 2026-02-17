"use client";

import React from "react";
import { useInfiniteQuery } from "react-query";
import { APICall } from "@/components/utils/extra";
import { getLatestEpisodes } from "@/components/utils/endpoints";
import { Skeleton } from "@heroui/react";
import NewestEpisodeCard from "@/components/Cards/NewestEpisodeCard";

const NewestEpisodes = () => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery(
			"latestEpisodes",
			async ({ pageParam = 1 }) => {
				const response = await APICall(
					getLatestEpisodes,
					[pageParam, 15],
					false,
					false,
				);
				return response.data;
			},
			{
				getNextPageParam: (lastPage) => {
					const currentPage = lastPage?.data?.data?.current_page;
					const lastPageNum = lastPage?.data?.data?.last_page;
					return currentPage < lastPageNum ? currentPage + 1 : undefined;
				},
				staleTime: 1000 * 60 * 5,
			},
		);

	const episodes: PodcastEpisode[] =
		data?.pages.flatMap((page) => page?.data?.data?.data) || [];

	return (
		<div className='space-y-6 mt-10'>
			{/* Header */}
			<div className='flex items-center justify-between px-2'>
				<h2 className='text-2xl font-bold text-white tracking-tight'>
					Newest episodes
				</h2>
			</div>

			{/* Grid Layout */}
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 px-2'>
				{isLoading
					? Array.from({ length: 9 }).map((_, i) => (
							<div key={i} className='flex items-center gap-4'>
								<Skeleton className='w-6 h-4 rounded bg-white/5' />
								<Skeleton className='size-16 rounded-lg shrink-0 bg-white/5' />
								<div className='flex-1 space-y-2'>
									<Skeleton className='h-4 w-3/4 rounded bg-white/5' />
									<Skeleton className='h-3 w-full rounded bg-white/5' />
									<Skeleton className='h-3 w-1/2 rounded bg-white/5' />
								</div>
							</div>
						))
					: episodes.map((episode, index) => (
							<NewestEpisodeCard
								key={`${episode.id}-${index}`}
								episode={episode}
								index={index}
								allEpisodes={episodes}
							/>
						))}
			</div>

			{/* See More Button */}
			{hasNextPage && (
				<div className='flex justify-center mt-8'>
					<button
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
						className='px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed'
					>
						{isFetchingNextPage ? "Loading..." : "See More"}
					</button>
				</div>
			)}
		</div>
	);
};

export default NewestEpisodes;
