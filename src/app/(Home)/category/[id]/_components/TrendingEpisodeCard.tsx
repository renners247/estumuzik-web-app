import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Picture from "@/components/picture/Index";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/components/Hooks";
import { playPause, setActiveSong } from "@/components/Redux/playerOne";

interface TrendingEpisodeCardProps {
  episode: any;
  title: string;
  description: string;
  image: string;
  duration?: number; // duration in seconds
  date: string;
}

const TrendingEpisodeCard = ({
  episode,
  title,
  description,
  image,
  duration,
  date,
}: TrendingEpisodeCardProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isPlaying, activeSong } = useAppSelector((state) => state.playerOne);

  const isCurrentSong = activeSong?.id === episode.id;
  const isNowPlaying = isCurrentSong && isPlaying;

  const durationInMinutes = duration ? Math.ceil(duration / 60) : 0;

  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentSong) {
      dispatch(playPause(!isPlaying));
    } else {
      dispatch(
        setActiveSong({
          song: episode,
          data: [episode],
          index: 0,
        }),
      );
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/episode/${episode.id}`);
  };

  return (
    <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group ">
      {/* Thumbnail with Play Button Overlay */}
      <div
        onClick={handlePlay}
        className="relative min-w-[100px] w-[100px] h-[100px] rounded-lg overflow-hidden shrink-0 group/image">
        <Picture
          src={image}
          alt={title}
          className="object-cover h-full w-full"
        />
        <div
          className={`absolute inset-0 bg-black/30 flex items-center justify-center ${isNowPlaying ? "opacity-100" : " group-hover/image:opacity-100"} transition-opacity`}>
          <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-500 flex items-center justify-center transform group-hover/image:scale-110 transition-transform">
            {isNowPlaying ?
              <FaPause className="text-white text-sm" />
            : <FaPlay className="text-white ml-1 text-sm " />}
          </div>
        </div>
      </div>

      {/* Episode Details */}
      <div className="flex flex-col justify-center flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <h3
            onClick={handleTitleClick}
            className="text-white font-bold text-base line-clamp-1 mb-1 hover:text-[#FFCC00] transition-colors cursor-pointer">
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
