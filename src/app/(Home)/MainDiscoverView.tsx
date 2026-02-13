"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import PodcastCard from "@/components/Cards/_components/PodcastCard";
import { trendingEpisodes } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"; // Import arrows

const PodcastSkeleton = () => (
	<div className='shrink-0 w-[280px] lg:w-[320px] h-[400px] bg-white/5 animate-pulse rounded-[32px]' />
);

const MainDiscoverView = () => {
	const observerTarget = useRef(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for scrolling

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
		useInfiniteQuery(
			"trending-episodes",
			async ({ pageParam = 1 }) => {
				const response = await APICall(
					trendingEpisodes,
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
			},
		);

	const allEpisodes =
		data?.pages.flatMap((page) => page?.data?.data?.data) || [];

	// --- NEW: Scroll Logic ---
	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const { scrollLeft, clientWidth } = scrollContainerRef.current;
			// Scroll by 80% of the visible width
			const scrollAmount = clientWidth * 0.8;
			const scrollTo =
				direction === "left"
					? scrollLeft - scrollAmount
					: scrollLeft + scrollAmount;

			scrollContainerRef.current.scrollTo({
				left: scrollTo,
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1, rootMargin: "400px" },
		);
		if (observerTarget.current) observer.observe(observerTarget.current);
		return () => observer.disconnect();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	return (
		<div className='space-y-2 bg-transparent'>
			{/* Section Header with Navigation */}
			<div className='flex items-center justify-between px-2'>
				<h2 className='text-2xl font-bold text-white tracking-tight'>
					Trending Episodes
				</h2>
				<div className='flex items-center gap-4'>
					{/* Scroll Arrows */}
					<div className='hidden md:flex items-center gap-2 mr-2'>
						<button
							onClick={() => scroll("left")}
							className='size-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90'
						>
							<RiArrowLeftSLine size={24} />
						</button>
						<button
							onClick={() => scroll("right")}
							className='size-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90'
						>
							<RiArrowRightSLine size={24} />
						</button>
					</div>

					<button className='px-5 py-1.5 border border-white/20 text-xs font-bold text-white rounded-full uppercase hover:bg-white/10 transition-all'>
						See all
					</button>
				</div>
			</div>

			{/* Horizontal Scroll Container */}
			<div
				ref={scrollContainerRef} // Attached Ref
				className='flex overflow-x-auto gap-6 pb-8 px-2 no-scrollbar scroll-smooth'
			>
				{isLoading &&
					Array.from({ length: 4 }).map((_, i) => <PodcastSkeleton key={i} />)}

				{allEpisodes.map((episode: any, index: number) => (
					<div
						key={episode?.id || index}
						className='shrink-0 w-[280px] lg:w-[320px]'
					>
						<PodcastCard
							key={episode.id}
							data={episode}
							index={index}
							allEpisodes={allEpisodes}
						/>
					</div>
				))}

				{(hasNextPage || isFetchingNextPage) && (
					<div
						ref={observerTarget}
						className='shrink-0 w-[280px] lg:w-[320px] h-full min-h-[400px] flex flex-col items-center justify-center bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-sm'
					>
						<div className='flex flex-col items-center gap-6'>
							<div className='relative size-16'>
								<div className='absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20'></div>
								<div className='size-full border-4 border-white/10 border-t-primary-500 rounded-full animate-spin shadow-[0_0_15px_rgba(255,204,0,0.3)]'></div>
							</div>
							<div className='text-center space-y-1'>
								<p className='text-white font-bold text-lg animate-pulse tracking-wide'>
									Fetching more
								</p>
								<p className='text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold'>
									Jolly Episodes
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MainDiscoverView;
