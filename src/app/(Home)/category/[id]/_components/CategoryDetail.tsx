"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";
import FilterPills from "./FilterPills";
import TrendingEpisodeCard from "./TrendingEpisodeCard";
import PodcastShowCard from "./PodcastShowCard";

interface CategoryDetailProps {
  categoryId: string;
}

const CategoryDetail = ({ categoryId }: CategoryDetailProps) => {
  const router = useRouter();

  // Format category ID for display (e.g., "business" -> "Business")
  const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);

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

        <FilterPills />
      </div>

      {/* Trending Episodes Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white mb-1">
            Trending episodes - {categoryName}
          </h2>
          <p className="text-gray-500 text-sm">Based on popular listening</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <TrendingEpisodeCard />
          <TrendingEpisodeCard />
          <TrendingEpisodeCard />
          <TrendingEpisodeCard />
        </div>
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
