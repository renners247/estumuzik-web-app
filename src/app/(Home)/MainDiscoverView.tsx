"use client";
import PodcastCard from "@/components/Cards/_components/PodcastCard";
import { trendingEpisodes } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";

// Create a Skeleton loader for a better UX
const PodcastSkeleton = () => (
	<div className='w-full max-w-[340px] h-[450px] bg-white/5 animate-pulse rounded-[32px]' />
);

const MainDiscoverView = () => {
	const [perPage, setPerPage] = useState(15);
	const [currentPage, setCurrentPage] = useState(1);

	const { data: trendingEpisodeData, isLoading } = useQuery(
		["trending-episode", currentPage, perPage],
		async () => {
			const response = await APICall(
				trendingEpisodes,
				[currentPage, perPage],
				false,
				false,
			);
			return response.data;
		},
		{
			staleTime: Infinity,
			keepPreviousData: true,
			refetchOnWindowFocus: true,
		},
	);

	// Extracting data safely
	const episodes = trendingEpisodeData?.data?.data?.data || [];
	const total = trendingEpisodeData?.data?.data?.total || 0;
	const observerTarget = useRef(null);

	// Intersection Observer for Infinite Scroll
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				// If the last element is visible and we aren't already loading
				if (
					entries[0].isIntersecting &&
					!isLoading &&
					episodes.length < total
				) {
					setCurrentPage((prev: number) => prev + 1);
				}
			},
			{ threshold: 0.1, rootMargin: "200px" }, // Trigger 200px before reaching the end
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [episodes?.length, total, isLoading, setCurrentPage]);

	return (
		<div className='p-6 space-y-6 bg-transparent'>
			{/* Horizontal Grid Container */}
			<div className='flex overflow-x-auto gap-6 pb-8 px-2 no-scrollbar scroll-smooth'>
				{/* Data Display */}
				{episodes.map((episode: any, index: number) => (
					<div
						key={episode?.id || index}
						className='shrink-0 w-[280px] lg:w-[320px]'
					>
						<PodcastCard data={episode} />
					</div>
				))}

				{/* Loading / Skeleton State (Horizontal) */}
				{isLoading &&
					Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className='shrink-0 w-[280px] lg:w-[320px]'>
							<PodcastSkeleton />
						</div>
					))}

				{/* Infinite Scroll Trigger (Invisible element at the end) */}
				<div
					ref={observerTarget}
					className='shrink-0 w-10 h-full flex items-center justify-center'
				>
					{isLoading && (
						<div className='animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500'></div>
					)}
				</div>

				{/* Empty State */}
				{!isLoading && episodes.length === 0 && (
					<div className='w-full flex flex-col items-center justify-center py-20 text-center bg-white/5 rounded-[32px] border border-dashed border-white/10'>
						<h3 className='text-xl font-bold text-white mb-2'>
							No Episodes Available
						</h3>
						<p className='text-gray-400'>Check back later for new content.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default MainDiscoverView;
