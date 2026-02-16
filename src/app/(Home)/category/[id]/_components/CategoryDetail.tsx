"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import FilterPills from "./FilterPills";
import TrendingEpisodeCard from "./TrendingEpisodeCard";
import { useQuery } from "react-query";
import { APICall } from "@/components/utils/extra";
import { categories, subCategories } from "@/components/utils/endpoints";
import { Skeleton } from "@heroui/react";
import CategoryPodcasts from "./CategoryPodcasts";
import { formatCategoryName } from "@/components/utils/function";
import SimplePagination from "@/components/reusables/SimplePagination";

interface CategoryDetailProps {
  categoryId: string;
}

interface ApiEpisode {
  id: number;
  title: string;
  description: string;
  duration: number;
  created_at: string;
  picture_url: string;
  podcast: {
    picture_url: string;
    title: string;
  };
}

const CategoryDetail = ({ categoryId }: CategoryDetailProps) => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10); // Changed from const to state
  const categoryName = formatCategoryName(categoryId);

  // 1. Fetch Key Categories to get the subcategories for the current category
  const { data: categoriesData } = useQuery(["categories"], async () => {
    const response = await APICall(categories, false, false);
    return response?.data?.data?.data;
  });

  const allCategories: ApiCategory[] =
    Array.isArray(categoriesData) ? categoriesData : [];

  const currentCategory = useMemo(() => {
    return allCategories.find(
      (cat) => cat.name.toLowerCase() === categoryId.toLowerCase(),
    );
  }, [allCategories, categoryId]);

  const filters = useMemo(() => {
    const subCats = currentCategory?.categories.map((c) => c.name) || [];
    return ["All", ...subCats];
  }, [currentCategory]);

  const { data: episodesData, isLoading: episodesIsLoading } = useQuery(
    ["categoryEpisodes", categoryId, activeFilter, currentPage, perPage],
    async () => {
      const subCategoryParam = activeFilter === "All" ? "" : activeFilter;
      const response = await APICall(
        subCategories,
        [currentPage, perPage, categoryId, subCategoryParam],
        false,
        false,
      );
      return response?.data?.data?.data;
    },
    {
      enabled: !!categoryId,
      staleTime: 1000 * 60,
    },
  );

  const episodes: ApiEpisode[] = episodesData?.data || [];

  const totalPages = episodesData?.total;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 lg:px-6 py-6 pb-24">
      {/* Header Section */}
      <div className="flex flex-col gap-6 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-[#FFCC00] transition-colors w-fit group">
          <div className="p-1 rounded-full border border-gray-600 group-hover:border-[#FFCC00] transition-colors">
            <IoChevronBack size={16} />
          </div>
          <span className="text-sm font-medium">Go back</span>
        </button>

        <h1 className="text-3xl font-bold text-white tracking-tight">
          {categoryName} Podcasts
        </h1>

        <FilterPills
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      <CategoryPodcasts
        categoryId={categoryId}
        categoryData={currentCategory}
        subCategory={activeFilter}
      />

      {/* Trending Episodes Section */}
      <div className="mt-12">
        <div className="mt-6">
          <h2 className="text-xl font-bold text-white mb-1">
            Trending episodes - {categoryName}
          </h2>
          <p className="text-gray-500 text-sm">Based on popular listening</p>
        </div>

        {episodesIsLoading ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-32 w-full rounded-xl bg-gray-800"
              />
            ))}
          </div>
        : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {episodes.map((episode) => (
              <TrendingEpisodeCard
                key={episode.id}
                episode={episode}
                title={episode.title}
                description={episode.description}
                image={
                  episode.picture_url ||
                  episode.podcast?.picture_url ||
                  "/placeholder.png"
                }
                duration={episode.duration}
                date={episode.created_at}
              />
            ))}
            {!episodesIsLoading && episodes.length === 0 && (
              <div className="col-span-full text-gray-500 text-sm py-8">
                No trending episodes found for this category.
              </div>
            )}
          </div>
        }

        {/* Pagination */}
        {totalPages && totalPages > perPage && (
          <SimplePagination
            currentPage={currentPage}
            totalContent={totalPages}
            perPage={perPage}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        )}
      </div>

      {/* All Podcasts Section */}
    </div>
  );
};

export default CategoryDetail;
