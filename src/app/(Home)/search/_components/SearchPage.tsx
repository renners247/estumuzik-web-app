"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { searchForPodcast } from "@/components/utils/endpoints";
import { APICall } from "@/components/utils/extra";
import PodcastShowCard, {
  PodcastShow,
} from "@/app/(Home)/category/[id]/_components/PodcastShowCard";
import { Skeleton } from "@heroui/react";
import { RiSearchLine } from "react-icons/ri";
import { IoChevronBack } from "react-icons/io5";

const SearchPage = () => {
  const searchParams = useSearchParams().toString();
  const [currentPage, setCurrentPage] = useState(1);
  const search = searchParams.replace(/=$/, "");
  const router = useRouter();

  const { data: searchData, isLoading: searchIsLoading } = useQuery(
    ["searchForPodcast", search, currentPage],
    async () => {
      if (search?.length > 0) {
        const response = await APICall(
          searchForPodcast,
          [search, currentPage, 100],
          false,
          false,
        );
        return response.data?.data?.data;
      }
    },
    {
      staleTime: Infinity,
      keepPreviousData: true,
      enabled: !!search && search.length > 0,
    },
  );

  const searchResults: PodcastShow[] = searchData?.data || [];
  const totalResults = searchData?.total || 0;

  return (
    <main className="pb-24">
      {/* Back Button */}
      <div className="px-4 mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-white hover:text-primary-500 transition-colors w-fit group">
          <div className="p-1 rounded-full border border-gray-600 group-hover:border-primary-500 transition-colors">
            <IoChevronBack size={16} />
          </div>
          <span className="text-sm font-medium">Go back</span>
        </button>
      </div>

      {/* Search Header */}
      <div className="px-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Search Results
        </h1>
        {search && (
          <p className="text-gray-400 text-sm">
            Showing results for{" "}
            <span className="text-primary-500 font-semibold">
              &quot;{decodeURIComponent(search)}&quot;
            </span>
          </p>
        )}
      </div>

      {/* Loading State */}
      {searchIsLoading && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-xl overflow-hidden">
              <Skeleton className="w-full aspect-square bg-white/5" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4 rounded bg-white/5" />
                <Skeleton className="h-3 w-1/2 rounded bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Count */}
      {!searchIsLoading && totalResults > 0 && (
        <div className="flex w-full py-3 px-4 text-sm sm:text-base text-white/70 mb-4">
          <span className="font-semibold">{totalResults}</span>
          &nbsp;Podcast{totalResults > 1 && "s"} Found
        </div>
      )}

      {/* Results Grid */}
      {!searchIsLoading && searchResults.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 px-4">
          {searchResults.map((podcast: PodcastShow) => (
            <PodcastShowCard key={podcast.id} podcast={podcast} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!searchIsLoading && search && searchResults.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <RiSearchLine size={64} className="mb-6 opacity-30" />
          <h3 className="text-xl font-bold text-white mb-2">
            No podcasts found
          </h3>
          <p className="text-sm text-gray-400 text-center max-w-md">
            We couldn&apos;t find any results for &quot;
            {decodeURIComponent(search)}&quot;. Try searching with different
            keywords.
          </p>
        </div>
      )}

      {/* No Search Query State */}
      {!search && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <RiSearchLine size={64} className="mb-6 opacity-30" />
          <h3 className="text-xl font-bold text-white mb-2">
            Search for podcasts
          </h3>
          <p className="text-sm text-gray-400 text-center max-w-md">
            Use the search bar or popular keywords to find your favorite
            podcasts.
          </p>
        </div>
      )}
    </main>
  );
};

export default SearchPage;
