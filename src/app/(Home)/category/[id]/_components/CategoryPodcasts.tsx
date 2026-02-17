"use client";

import React, { useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { LuListFilter } from "react-icons/lu";
import { Skeleton } from "@heroui/react";
import { APICall } from "@/components/utils/extra";
import { getCategoryPodcasts } from "@/components/utils/endpoints";
import PodcastShowCard, { PodcastShow } from "./PodcastShowCard";
import SimplePagination from "@/components/reusables/SimplePagination";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const categoryName = categoryData?.name || categoryId;
  const subCategoryParam = subCategory === "All" ? "" : subCategory;

  const { data: categoryPodcasts, isLoading } = useQuery(
    ["categoryPodcasts", categoryName, subCategoryParam, currentPage, perPage],
    async () => {
      const response = await APICall(
        getCategoryPodcasts,
        [categoryName, subCategoryParam, currentPage, perPage],
        false,
        false,
      );

      return response?.data?.data?.data;
    },
  );

  const podcasts: PodcastShow[] = categoryPodcasts?.data || [];
  const totalPodcasts = categoryPodcasts?.total || 0;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 text-white font-medium">
          <span className="text-sm">
            {subCategoryParam ?
              `${subCategoryParam} Podcast${totalPodcasts !== 1 ? "s" : ""}`
            : `Available Podcast${totalPodcasts !== 1 ? "s" : ""}`}
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
      {totalPodcasts > 0 && (
        <div className="flex justify-center mt-10">
          <SimplePagination
            currentPage={currentPage}
            perPage={perPage}
            totalContent={totalPodcasts}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPodcasts;
