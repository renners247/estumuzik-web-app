"use client";

import { useQuery } from "react-query";
import { Skeleton } from "@heroui/react";
import { useEffect, useState } from "react";
import GoBack from "../../_components/GoBack";
import { APICall } from "@/components/utils/extra";
import { getFavorites } from "@/components/utils/endpoints";
import FavoritesCard from "@/components/Cards/FavoritesCard";

const Favorites = () => {
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFavorites, setTotalFavorites] = useState(null);

  const { data: favoritesData, isLoading } = useQuery(
    ["favorites", currentPage, perPage],
    async () => {
      const response = await APICall(
        getFavorites,
        [currentPage, perPage],
        false,
        false,
      );
      const total = response?.data?.data?.total;
      console.log("total: ", total);

      return response?.data?.data?.data;
    },
    {
      // staleTime: 1000 * 60 * 5,
    },
  );

  const favoriteEpisodes: NewestEpisode[] = favoritesData?.data;

  useEffect(() => {
    setTotalFavorites(favoritesData?.total);
    console.log("total favorites: ", totalFavorites);
  }, []);

  return (
    <div className="space-y-6 mt-10">
      {/* Header */}
      <div className="space-y-8">
        <GoBack />
        <div className="flex flex-col gap-1 px-2">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>❤️</span> Your Favorite Episodes
          </h2>
          <p className="text-gray-400 text-sm">Episodes you love</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#1A1A1A] p-4 rounded-xl flex flex-col gap-4"
              >
                <Skeleton className="w-full aspect-square rounded-lg bg-white/5" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-3/4 rounded bg-white/5" />
                  <Skeleton className="h-4 w-1/2 rounded bg-white/5" />
                </div>
                <Skeleton className="h-20 w-full rounded bg-white/5" />
                <div className="flex gap-3 mt-auto pt-2">
                  <Skeleton className="h-9 w-24 rounded-full bg-white/5" />
                  <Skeleton className="h-9 w-24 rounded-full bg-white/5" />
                </div>
              </div>
            ))
          : favoriteEpisodes.map((episode, index) => (
              <FavoritesCard
                key={episode.id}
                episode={episode}
                allEpisodes={favoriteEpisodes}
                index={index}
              />
            ))}
      </div>
      {totalFavorites && totalFavorites > perPage && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(totalFavorites / perPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === index + 1
                      ? "bg-primary-500 text-white"
                      : "bg-gray-700 text-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;
