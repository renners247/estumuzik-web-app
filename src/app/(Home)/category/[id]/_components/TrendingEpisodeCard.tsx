import React from "react";
import { FaPlay } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Picture from "@/components/picture/Index";

interface TrendingEpisodeCardProps {
  title: string;
  description: string;
  image: string;
  duration?: number; // duration in seconds
  date: string;
}

const TrendingEpisodeCard = ({
  title,
  description,
  image,
  duration,
  date,
}: TrendingEpisodeCardProps) => {
  // Format duration (seconds -> minutes)
  const durationInMinutes = duration ? Math.ceil(duration / 60) : 0;

  // Format date (e.g. 2025-02-10 -> 10 Feb, 25)
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  return (
    <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
      {/* Thumbnail with Play Button Overlay */}
      <div className="relative min-w-[100px] w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0">
        <Picture
          src={image}
          alt={title}
          className="object-cover h-full w-full"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <FaPlay className="text-white ml-1 text-sm " />
          </div>
        </div>
      </div>

      {/* Episode Details */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <h3 className="text-white font-bold text-base line-clamp-1 mb-1">
            {title}
          </h3>
          <button className="text-gray-400 hover:text-white p-1">
            <BsThreeDotsVertical />
          </button>
        </div>
        <p className="text-gray-400 text-xs line-clamp-2 mb-2 leading-relaxed">
          {description}
        </p>
        <div className="text-gray-500 text-xs font-medium">
          {formattedDate} • {durationInMinutes} minutes
        </div>
      </div>
    </div>
  );
};

export default TrendingEpisodeCard;
