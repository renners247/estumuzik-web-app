"use client";

import { FaPlay } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { trendingEpisodeBg } from "../../../../../../public";
import Picture from "@/components/picture/Index";

const TrendingEpisodeCard = () => {
  return (
    <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
      {/* Thumbnail with Play Button Overlay */}
      <div className="relative min-w-[100px] w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0">
        <Picture
          src={trendingEpisodeBg}
          alt="Episode Thumbnail"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-white bg-green_1-100 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <FaPlay className="text-white ml-1 text-sm " />
          </div>
        </div>
      </div>

      {/* Episode Details */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <h3 className="text-white font-bold text-base line-clamp-1 mb-1">
            Caleb Maru: Navigating Africa's Tech...
          </h3>
          <button className="text-gray-400 hover:text-white p-1">
            <BsThreeDotsVertical />
          </button>
        </div>
        <p className="text-gray-400 text-xs line-clamp-2 mb-2 leading-relaxed">
          In this episode of the Change Africa Podcast, we host Tarek Mougani
          multifaceted founder...
        </p>
        <div className="text-gray-500 text-xs font-medium">
          20 June, 23 • 30 minutes
        </div>
      </div>
    </div>
  );
};

export default TrendingEpisodeCard;
