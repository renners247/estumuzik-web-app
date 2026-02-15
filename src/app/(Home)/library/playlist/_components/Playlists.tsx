"use client";

import { useState } from "react";
import { useQuery } from "react-query";
import { APICall } from "@/components/utils/extra";
import PlaylistCard from "@/components/Cards/PlaylistCard";
import { getPlaylists } from "@/components/utils/endpoints";

const Playlists = () => {
  const [perPage, setPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPlaylists, setTotalPlaylists] = useState(null);

  const { data: playlistsData, isLoading } = useQuery(
    ["playlists", currentPage, perPage],
    async () => {
      const response = await APICall(
        getPlaylists,
        [currentPage, perPage],
        false,
        false,
      ); // Fetch 3 items
      const total = response?.data?.data?.data?.total;
      setTotalPlaylists(total);
      return response?.data?.data?.data;
    },
    {
      staleTime: 1000 * 60 * 5,
    },
  );

  const playlists: Playlist[] = playlistsData?.data;

  const PlaylistCardSkeleton = () => {
    return (
      <div className="group relative bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl animate-pulse">
        {/* Cover Image Skeleton */}
        <div className="relative mb-4">
          <div className="w-full aspect-square bg-zinc-800 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-music text-4xl text-zinc-700"></i>
          </div>
          {/* Play button skeleton (hidden during loading) */}
          <div className="absolute bottom-2 right-2 w-12 h-12 bg-zinc-700/50 rounded-full" />
        </div>

        {/* Title and Episode Count Skeleton */}
        <div className="space-y-3">
          <div className="h-6 w-3/4 bg-zinc-800 rounded-md" />
          <div className="h-4 w-1/3 bg-zinc-800 rounded-md" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="h-3 w-3 bg-zinc-800 rounded" />
            <div className="h-3 w-12 bg-zinc-800 rounded" />
          </div>
          <div className="h-3 w-16 bg-zinc-800 rounded" />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 mt-10">
      {/* Header */}
      <div className="flex flex-col gap-1 px-2">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          Your Playlists
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <PlaylistCardSkeleton />)
          : playlists.map((playlist, index) => (
              <PlaylistCard
                key={playlist.id}
                playlist={playlist}
                allPlaylists={playlists}
                index={index}
              />
            ))}
      </div>
      {totalPlaylists && totalPlaylists > perPage && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: Math.ceil(totalPlaylists / perPage) }).map(
              (_, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentPage === index + 1
                      ? "bg-primary-100 text-white"
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

export default Playlists;
