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

const libraryItems = [
  {
    id: "favorites",
    title: "Your Favorites",
    subtitle: "4 Episodes",
    image: favorites,
    href: "/library/favorites",
  },
  {
    id: "recently-played",
    title: "Recently played",
    subtitle: "3 Episodes",
    image: recentlyPlayed,
    href: "/library/recent",
  },
  {
    id: "playlists",
    title: "Your Playlists",
    subtitle: "0 Playlist",
    image: playlist,
    href: "/library/playlists",
  },
  {
    id: "following",
    title: "Podcast you follow",
    subtitle: "2 Podcasts",
    image: podcastFollow,
    href: "/library/following",
  },
];

const LibraryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = libraryItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
              className="group flex flex-col gap-3 cursor-pointer">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LibraryPage;
