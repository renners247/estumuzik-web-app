"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiSearchLine } from "react-icons/ri";
import {
  favorites,
  recentlyPlayed,
  playlist,
  podcastFollow,
} from "../../../../../public";
import Picture from "@/components/picture/Index";
import { useQuery } from "react-query";
import { APICall } from "@/components/utils/extra";
import {
  getFavorites,
  getPlaylists,
  getRecentlyPlayed,
} from "@/components/utils/endpoints";

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalFavorites, setTotalFavorites] = useState(null);
  const [totalPlaylists, setTotalPlaylists] = useState(null);
  const [totalRecentlyPlayed, setTotalRecentlyPlayed] = useState(null);

  const { data: favoriteEpisodesData, isLoading } = useQuery(
    ["favoriteEpisodes"],
    async () => {
      const response = await APICall(getFavorites, false, false);
      const total = response?.data?.data?.data?.total;
      setTotalFavorites(total);
      return response?.data?.data?.data;
    },
    {
      // staleTime: 1000 * 60 * 5,
    },
  );

  const { data: playlistsData } = useQuery(
    ["playlists"],
    async () => {
      const response = await APICall(getPlaylists, false, false); // Fetch 3 items
      const total = response?.data?.data?.data?.total;
      setTotalPlaylists(total);
      return response?.data?.data?.data;
    },
    {
      // staleTime: 1000 * 60 * 5,
    },
  );

  const { data: recentlyPlayedData } = useQuery(
    ["recently-played"],
    async () => {
      const response = await APICall(
        getRecentlyPlayed,
        false,
        false,
      );
      const total = response?.data?.data?.data?.total;
      setTotalRecentlyPlayed(total);
      return response?.data?.data?.data;
    },
    {
      // staleTime: 1000 * 60 * 5,
    },
  );

  // const favoriteEpisodes: NewestEpisode[] = favoriteEpisodesData?.data || [];

  const libraryItems = [
    {
      id: "favorites",
      title: "Your Favorites",
      subtitle: `${totalFavorites && totalFavorites !== null ? totalFavorites : ""} Episodes`,
      image: favorites,
      href: "/library/favorites",
    },
    {
      id: "recently-played",
      title: "Recently played",
      subtitle: `${totalPlaylists && totalPlaylists !== null ? totalPlaylists : ""} Episodes`,
      image: recentlyPlayed,
      href: "/library/recently-played",
    },
    {
      id: "playlists",
      title: "Your Playlists",
      subtitle: `${totalPlaylists && totalPlaylists !== null ? totalPlaylists : ""} Playlists`,
      image: playlist,
      href: "/library/playlist",
    },
    // {
    //   id: "following",
    //   title: "Podcast you follow",
    //   subtitle: "2 Podcasts",
    //   image: podcastFollow,
    //   href: "/library/following",
    // },
  ];

  const filteredItems = libraryItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const CardSkeleton = () => {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        {/* Card Image Skeleton */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-800">
          <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shimmer" />
        </div>

        {/* Card Details Skeleton */}
        <div className="flex flex-col gap-2">
          {/* Title skeleton */}
          <div className="h-5 md:h-6 w-3/4 bg-gray-800 rounded-md" />
          {/* Subtitle skeleton */}
          <div className="h-3 md:h-4 w-1/2 bg-gray-800 rounded-md" />
        </div>
      </div>
    );
  };

  return (
    <section className="px-3 sm:px-4 lg:px-6 mt-2 lg:mt-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="w-full max-w-md mb-8 lg:mb-12">
          <div className="relative w-full group">
            <input
              type="text"
              placeholder="Search for Categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#111111] text-gray-300 text-sm py-3 px-5 pr-12 rounded-full 
                       outline-none border border-transparent focus:border-[#FFCC00]/50 
                       transition-all duration-300 placeholder:text-gray-500"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <RiSearchLine size={18} />
            </div>
          </div>
        </div>

        {/* Library Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-24">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col gap-3 cursor-pointer"
            >
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <div>
                  {/* Card Image */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.02]">
                    <Picture
                      src={item.image}
                      alt={item.title}
                      className="object-cover"
                    />
                  </div>

                  {/* Card Details */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-white font-bold text-base md:text-lg leading-tight group-hover:text-[#FFCC00] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs md:text-sm font-medium">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibraryPage;
