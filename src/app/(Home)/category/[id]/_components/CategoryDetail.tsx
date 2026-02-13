"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import FilterPills from "./FilterPills";
import TrendingEpisodeCard from "./TrendingEpisodeCard";
import PodcastShowCard from "./PodcastShowCard";
import { useQuery } from "react-query";
import { APICall } from "@/components/utils/extra";
import { categories, subCategories } from "@/components/utils/endpoints";
import { Skeleton } from "@heroui/react";

interface CategoryDetailProps {
  categoryId: string;
}

interface ApiSubCategory {
  name: string;
  image_url: string;
}

interface ApiCategory {
  name: string;
  categories: ApiSubCategory[];
  images: string[];
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
  const [perPage, setPerPage] = useState<number>(15); // Changed from const to state
  const categoryName =
    categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "";

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
    ["categoryEpisodes", categoryId, activeFilter],
    async () => {
      const subCategoryParam = activeFilter === "All" ? "" : activeFilter;
      const response = await APICall(
        subCategories,
        [currentPage, perPage, categoryId, subCategoryParam], // Args: page, per_page, name, subcategory
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

      {/* Trending Episodes Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-1">
            Trending episodes - {categoryName}
          </h2>
          <p className="text-gray-500 text-sm">Based on popular listening</p>
        </div>

        {episodesIsLoading ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))}
          </div>
        : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {episodes.map((episode) => (
              <TrendingEpisodeCard
                key={episode.id}
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
      </div>

      {/* All Podcasts Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-white font-medium cursor-pointer hover:text-gray-300">
            <LuListFilter size={20} />
            <span className="text-sm">
              Sort by: <span className="text-gray-400">Newest</span>
            </span>
            <IoChevronBack className="rotate-[-90deg]" size={14} />
          </div>

          <button className="px-4 py-1.5 rounded-full border border-white/20 text-white text-sm hover:bg-white/5 transition-colors">
            Show More
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8">
          <PodcastShowCard isFollowing={false} />
          <PodcastShowCard isFollowing={true} />
          <PodcastShowCard isFollowing={false} />
          <PodcastShowCard isFollowing={true} />
          <PodcastShowCard isFollowing={false} />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
