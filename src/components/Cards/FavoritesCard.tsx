"use client";

import { useState } from "react";
import Picture from "../picture/Index";
import { APICall } from "../utils/extra";
import { MdFavorite } from "react-icons/md";
import { removeFromFavorites } from "../utils/endpoints";
import { useMutation, useQueryClient } from "react-query";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { playPause, setActiveSong } from "../Redux/playerOne";
import { setIsEpisodeRegistered } from "../Redux/ToggleModal";
import { FaPlay, FaPause, FaPlus, FaCheck } from "react-icons/fa6";

interface FavoritesCardProps {
  episode: NewestEpisode;
  allEpisodes: NewestEpisode[];
  index: number;
}

const FavoritesCard = ({ episode, allEpisodes, index }: FavoritesCardProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const { activeSong, isPlaying, isLoading } = useAppSelector(
    (state) => state.playerOne,
  );
  const [following, setFollowing] = useState(false);

  // Check if THIS specific card is the one playing
  const isCurrentActiveSong = activeSong?.id === episode.id;

  const handlePauseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(playPause(false));
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentActiveSong) {
      dispatch(playPause(true));
    } else {
      dispatch(
        setActiveSong({
          song: episode,
          data: allEpisodes,
          index: index,
        }),
      );
    }
    dispatch(setIsEpisodeRegistered(false));
  };

  // const toggleFollow = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setFollowing(!following);
  // };

  // Mutation for removing from favorites
  const removeFromFavoritesMutation = useMutation(
    (episodeId: number) =>
      APICall(removeFromFavorites, [episodeId], false, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("favorites");
      },
    },
  );

  const handleRemoveFromFavorite = (id: number) => {
    removeFromFavoritesMutation.mutate(id);
  };

  return (
    <div className="bg-[#1A1A1A] p-4 rounded-xl flex flex-col gap-4 group hover:bg-[#222] transition-colors cursor-pointer">
      {/* Podcast Image */}
      <div className="w-full aspect-square rounded-lg overflow-hidden relative">
        <Picture
          src={episode.podcast?.picture_url || episode.picture_url}
          alt={episode.podcast?.title || episode.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
        />
        {episode?.is_favourite && (
          <button
            className="absolute top-2 right-2 bg-gray-900/70 p-1 rounded-full backdrop-blur-sm transition-colors hover:bg-gray-900/90"
            // title="favorite"
            onClick={() => handleRemoveFromFavorite(episode?.id)}
          >
            <MdFavorite className="text-red-500 text-lg" />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col gap-1">
        <h3 className="text-white font-bold text-lg line-clamp-1">
          {episode.podcast?.title || episode.title}
        </h3>
        <p className="text-gray-400 text-sm">
          By: {episode.podcast?.author || "Unknown Author"}
        </p>
      </div>

      {/* Description */}
      <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed h-[60px]">
        {episode.podcast?.description || episode.description}
      </p>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-auto pt-2">
        {/* <button
          onClick={toggleFollow}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all
            ${
              following
                ? "bg-white/20 text-white"
                : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`}
        >
          {following ? <FaCheck /> : <FaPlus />}
          {following ? "Following" : "Follow"}
        </button> */}

        <button
          onClick={
            isCurrentActiveSong && isPlaying
              ? handlePauseClick
              : handlePlayClick
          }
          className="flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold bg-primary-500 text-white hover:bg-primary-600 transition-all"
        >
          {isLoading && isCurrentActiveSong ? (
            <div className="size-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          ) : isCurrentActiveSong && isPlaying ? (
            <FaPause />
          ) : (
            <FaPlay />
          )}
          {isCurrentActiveSong && isPlaying ? "Pause" : "Play"}
        </button>

        <span className="ml-auto text-gray-500 text-xs font-medium">
          {Math.ceil(episode.duration / 60)} Mins
        </span>
      </div>
    </div>
  );
};

export default FavoritesCard;
