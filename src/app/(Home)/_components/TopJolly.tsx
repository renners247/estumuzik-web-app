"use client";

import React, { useRef, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { APICall } from "@/components/utils/extra";
import { topJolly } from "@/components/utils/endpoints";
import Picture from "@/components/picture/Index";
import { Skeleton } from "@heroui/react";
import TopJollyCard from "@/components/Cards/TopJollyCard";

const TopJolly = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerTarget = useRef(null);

  const {
    data: podcastData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
    ["topJolly"],
    async ({ pageParam = 1 }) => {
      const response = await APICall(topJolly, [pageParam, 10], false, false);
      return response?.data;
    },
    {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage?.data?.current_page;
        const lastPageNum = lastPage?.data?.last_page;
        return currentPage < lastPageNum ? currentPage + 1 : undefined;
      },
      staleTime: 1000 * 60 * 5, // 5 minutes cache
    },
  );

  const podcasts: TopJollyPodcast[] =
    podcastData?.pages.flatMap((page) => page?.data?.data?.data) || [];

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      const scrollTo =
        direction === "left" ?
          scrollLeft - scrollAmount
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
      { threshold: 0.1, rootMargin: "100px" }, // Adjusted rootMargin for horizontal scroll
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (!isLoading && podcasts.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Top jolly
        </h2>
        <div className="flex items-center gap-4">
          {/* Scroll Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="size-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90">
              <RiArrowLeftSLine size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="size-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90">
              <RiArrowRightSLine size={20} />
            </button>
          </div>

          <button className="px-5 py-1.5 border border-white/20 text-xs font-bold text-white rounded-full uppercase hover:bg-white/10 transition-all">
            See all
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-4 pb-4 px-2 no-scrollbar scroll-smooth">
        {isLoading ?
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[200px] sm:w-[240px] shrink-0">
              <Skeleton className="aspect-square rounded-xl mb-3 w-full bg-white/5" />
              <Skeleton className="h-4 w-3/4 mb-2 rounded-lg bg-white/5" />
              <Skeleton className="h-3 w-1/2 mb-4 rounded-lg bg-white/5" />
              <div className="flex gap-2">
                <Skeleton className="h-9 flex-1 rounded-full bg-white/5" />
                <Skeleton className="size-9 rounded-full bg-white/5" />
              </div>
            </div>
          ))
        : podcasts.map((podcast, index) => (
            <TopJollyCard key={`${podcast.id}-${index}`} podcast={podcast} />
          ))
        }

        {/* Loading Sentinel / Spinner */}
        {(hasNextPage || isFetchingNextPage) && (
          <div
            ref={observerTarget}
            className="w-[100px] shrink-0 flex items-center justify-center">
            {isFetchingNextPage && (
              <div className="size-8 border-2 border-white/20 border-t-[#FFCC00] rounded-full animate-spin"></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopJolly;
