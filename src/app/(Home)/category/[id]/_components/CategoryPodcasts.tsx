"use client";

import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { LuListFilter } from "react-icons/lu";
import { Skeleton } from "@heroui/react";
import { APICall } from "@/components/utils/extra";
import { getCategoryPodcasts } from "@/components/utils/endpoints";
import PodcastShowCard, { PodcastShow } from "./PodcastShowCard";

interface CategoryPodcastsProps {
  categoryId: string;
  categoryData: ApiCategory | undefined;
  subCategory: string;
}

const CategoryPodcasts = ({
  categoryId,
  categoryData,
  subCategory,
}: CategoryPodcastsProps) => {
  const [perPage] = useState(15);
  const categoryName = categoryData?.name || categoryId;
  const subCategoryParam = subCategory === "All" ? "" : subCategory;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      ["categoryPodcasts", categoryName, subCategoryParam],
      async ({ pageParam = 1 }) => {
        const response = await APICall(
          getCategoryPodcasts,
          [categoryName, subCategoryParam, pageParam, perPage],
          false,
          false,
        );

        return response?.data?.data?.data;
      },
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage) return undefined;

          const current_page = lastPage.current_page;
          const last_page = lastPage.last_page;
          return current_page < last_page ? current_page + 1 : undefined;
        },
        staleTime: 1000 * 60 * 5,
      },
    );

  // Flatten the pages to get all podcasts
  // If the structure is correct, `page` is the pagination object, and `page.data` is the array of podcasts.
  const podcasts: PodcastShow[] =
    data?.pages.flatMap((page) => page?.data || []) || [];
  const totalPodcasts = data?.pages[0]?.total || 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white font-medium">
          <LuListFilter size={20} className="text-[#00C27A]" />
          <span className="text-sm">
            {subCategoryParam ? `${subCategoryParam} Podcasts` : "All Podcasts"}
            <span className="text-gray-400 ml-2">({totalPodcasts})</span>
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
        {isLoading ?
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <Skeleton className="aspect-square w-full rounded-xl bg-white/5" />
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-3/4 rounded bg-white/5" />
                <Skeleton className="h-3 w-1/2 rounded bg-white/5" />
              </div>
            </div>
          ))
        : podcasts.map((podcast) => (
            <PodcastShowCard
              key={podcast.id}
              podcast={podcast}
              isFollowing={false}
            />
          ))
        }
      </div>

      {!isLoading && podcasts.length === 0 && (
        <div className="text-gray-500 text-center py-10">
          No podcasts found in this category.
        </div>
      )}

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {isFetchingNextPage ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPodcasts;
