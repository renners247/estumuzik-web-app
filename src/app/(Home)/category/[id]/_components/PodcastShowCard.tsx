"use client";

import React, { useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { ndlShowFollow, ndlShowFollowing } from "../../../../../../public";
import Picture from "@/components/picture/Index";

export interface PodcastShow {
  id: number;
  title: string;
  author: string;
  category_name: string;
  picture_url: string;
  subscriber_count: number;
  description: string;
}

interface PodcastShowCardProps {
  podcast: PodcastShow;
  isFollowing?: boolean;
}

const PodcastShowCard = ({
  podcast,
  isFollowing = false,
}: PodcastShowCardProps) => {
  const [following, setFollowing] = useState(isFollowing);

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowing(!following);
  };

  return (
    <div className="flex flex-col w-full group cursor-pointer">
      {/* Show Cover */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#1A1A1A]">
        <Picture
          src={podcast.picture_url || "/placeholder.png"}
          alt={podcast.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Show Details */}
      <div className="flex flex-col gap-1 mb-3">
        <h3 className="text-white font-bold text-lg leading-tight line-clamp-1">
          {podcast.title}
        </h3>
        <p className="text-gray-400 text-sm line-clamp-1">
          By: {podcast.author}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 mt-auto">
        <button
          onClick={toggleFollow}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
            ${
              following ?
                "bg-[#00C27A] text-white hover:bg-[#00a86b]"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}>
          {following ?
            <FaCheck size={12} />
          : <FaPlus size={12} />}
          {following ? "Following" : "Follow"}
        </button>

        <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors border border-white/5">
          <IoShareSocialOutline size={18} />
        </button>
      </div>
    </div>
  );
};

export default PodcastShowCard;
