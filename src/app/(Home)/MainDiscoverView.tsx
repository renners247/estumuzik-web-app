"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import EpisodeCard from "@/components/Cards/_components/EpisodeCard";
import { trendingEpisodes } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"; // Import arrows
import TopJolly from "./_components/TopJolly";
import { ScrollShadow, Spinner } from "@heroui/react";

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
				staleTime: Infinity,
				refetchOnWindowFocus: true,
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
		<div className='space-y-8 bg-transparent'>
			{/* Top Jolly Section */}

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
			<div className='w-full relative group'>
				{/* 
                Hero UI ScrollShadow 
                - orientation="horizontal": Enables side shadows
                - size={100}: The "strength" or width of the shadow
                - hideScrollBar: Clean tech look
            */}
				<ScrollShadow
					hideScrollBar
					offset={10}
					orientation='horizontal'
					size={100}
					className='flex items-center gap-6 pb-8 px-4 scroll-smooth'
				>
					{/* 1. LOADING SKELETONS */}
					{isLoading &&
						Array.from({ length: 4 }).map((_, i) => (
							<div key={i} className='shrink-0 w-[240px] lg:w-[280px]'>
								<PodcastSkeleton />
							</div>
						))}

					{/* 2. EPISODE CARDS */}
					{allEpisodes.map((episode: any, index: number) => (
						<div
							key={episode?.id || index}
							className='shrink-0 w-[240px] lg:w-[280px]'
						>
							<EpisodeCard
								data={episode}
								index={index}
								allEpisodes={allEpisodes}
							/>
						</div>
					))}

					{/* 3. INFINITE LOADING TARGET (Hero UI Styled) */}
					{(hasNextPage || isFetchingNextPage) && (
						<div
							ref={observerTarget}
							className='shrink-0 w-[240px] lg:w-[280px] h-[380px] flex flex-col items-center justify-center bg-zinc-900/40 rounded-[32px] border border-white/5 backdrop-blur-md'
						>
							<div className='flex flex-col items-center gap-4'>
								{/* Using Hero UI Spinner with your brand color */}
								<Spinner
									size='lg'
									color='primary'
									labelColor='primary'
									classNames={{
										circle1: "border-b-blue-500",
										circle2: "border-b-blue-500",
									}}
								/>
								<div className='text-center'>
									<p className='text-white font-bold text-sm tracking-widest uppercase italic'>
										Syncing
									</p>
									<p className='text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]'>
										Data Stream
									</p>
								</div>
							</div>
						</div>
					)}
				</ScrollShadow>
			</div>
		</div>
	);
};

export default MainDiscoverView;
