"use client";
import { FaCheck, FaPlus } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import Picture from "../picture/Index";
import React from "react";

const TopJollyCard = ({ podcast }: { podcast: TopJollyPodcast }) => {
  // Local state for follow button interaction (simulated for now)
  const [following, setFollowing] = React.useState(false);

  const toggleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFollowing(!following);
  };

  return (
    <div className="flex flex-col w-[200px] sm:w-[240px] shrink-0 group cursor-pointer bg-[#1A1A1A] p-3 rounded-2xl hover:bg-[#222] transition-colors">
      {/* Cover Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3">
        <Picture
          src={podcast.picture_url || "/placeholder.png"}
          alt={podcast.title}
          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1 mb-4 h-[52px]">
        <h3 className="text-white font-bold text-base leading-tight line-clamp-1">
          {podcast.title}
        </h3>
        <p className="text-gray-400 text-xs truncate">
          By:{" "}
          {podcast.author ||
            `${podcast.publisher?.first_name} ${podcast.publisher?.last_name}`}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto">
        <button
          onClick={toggleFollow}
          className={`flex-1 flex items-center justify-center gap-2 h-9 rounded-full text-xs font-bold transition-all duration-200
            ${
              following ?
                "bg-[#00C27A] text-white hover:bg-[#00a86b]"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}>
          {following ?
            <FaCheck size={10} />
          : <FaPlus size={10} />}
          {following ? "Following" : "Follow"}
        </button>

        <button className="size-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-colors border border-white/5 shrink-0">
          <IoShareSocialOutline size={16} />
        </button>
      </div>
    </div>
  );
};

export default TopJollyCard;
