"use client";
import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import EpisodeCard from "@/components/Cards/_components/EpisodeCard";
import { trendingEpisodes } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { ScrollShadow, Spinner } from "@heroui/react";

const PodcastSkeleton = () => (
	<div className='shrink-0 w-[240px] lg:w-[280px] h-[380px] bg-zinc-900/50 animate-pulse rounded-[32px] border border-white/5' />
);

const MainDiscoverView = () => {
	const observerTarget = useRef(null);
	// This Ref must be attached to the scrolling element
	const scrollContainerRef = useRef<HTMLDivElement>(null);

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
			},
		);

	const allEpisodes =
		data?.pages.flatMap((page) => page?.data?.data?.data) || [];

	// --- FIX: Scroll Logic attached to the ref ---
	const handleScroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const { scrollLeft, clientWidth } = scrollContainerRef.current;
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
			{/* Section Header */}
			<div className='flex items-center justify-between px-4'>
				<h2 className='text-2xl font-black text-white tracking-tight uppercase'>
					Trending <span className='text-primary-500'>Episodes</span>
				</h2>

				<div className='flex items-center gap-6'>
					{/* Technical Navigation Sockets */}
					<div className='hidden md:flex items-center gap-3'>
						<button
							onClick={() => handleScroll("left")}
							className='size-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all active:scale-90'
						>
							<RiArrowLeftSLine size={20} />
						</button>
						<button
							onClick={() => handleScroll("right")}
							className='size-10 flex items-center justify-center rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:border-blue-500/50 transition-all active:scale-90'
						>
							<RiArrowRightSLine size={20} />
						</button>
					</div>
				</div>
			</div>

			{/* Horizontal Scroll Container */}
			<div className='w-full relative group'>
				<ScrollShadow
					ref={scrollContainerRef}
					hideScrollBar
					offset={5}
					orientation='horizontal'
					size={40}
					className='flex lg:items-center sm:gap-6 pb-0 lg:pb-12 px-4 scroll-smooth'
				>
					{/* 1. LOADING SKELETONS */}
					{isLoading &&
						Array.from({ length: 4 }).map((_, i) => (
							<PodcastSkeleton key={i} />
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

					{/* 3. INFINITE LOADING TARGET */}
					{(hasNextPage || isFetchingNextPage) && (
						<div
							ref={observerTarget}
							className='shrink-0 w-[240px] lg:w-[280px] h-[380px] flex flex-col items-center justify-center bg-zinc-900/40 rounded-[32px] border border-white/5 backdrop-blur-md'
						>
							<div className='flex flex-col items-center gap-4'>
								<Spinner size='lg' color='primary' />
								<div className='text-center'>
									<p className='text-white font-bold text-sm tracking-widest uppercase'>
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
