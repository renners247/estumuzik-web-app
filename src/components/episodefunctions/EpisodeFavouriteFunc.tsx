"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { APICall } from "../utils/extra";
import { addFavorite, removeFromFavorites } from "../utils/endpoints";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface EpisodeFavouriteFuncProps {
	episodeData: PodcastEpisode;
}
const EpisodeFavouriteFunc = ({ episodeData }: EpisodeFavouriteFuncProps) => {
	const [isFavourite, setIsFavourite] = useState(false);
	const queryClient = useQueryClient();

	const episodeId = episodeData?.id;
	// Favourite
	const addFavoriteMutation = useMutation(
		() => APICall(addFavorite, [episodeId], false, false),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries("episode-courses");
				queryClient.invalidateQueries("customer-course");
			},
		},
	);

	const handleAddFavorite = () => {
		setIsFavourite(true);
		addFavoriteMutation.mutate();
	};

	const removeFavoriteMutation = useMutation(
		() => APICall(removeFromFavorites, [episodeId], false, false),
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries("episode-courses");
				queryClient.invalidateQueries("customer-course");
			},
		},
	);

	const handleRemoveFavorite = () => {
		setIsFavourite(false);
		removeFavoriteMutation.mutate();
	};

	// 	useEffect(() => {
	// 	if (episodeData) {
	// 		setIsFavourite(episodeData?.);
	// 	}
	// }, []);
	return (
		<button
			aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
			className='relative hover:text-red-400 duration-200 hover:scale-105 size-11 flex items-center justify-center rounded-full border border-gray-500/40 text-white hover:bg-white/10 transition-all'
			onClick={isFavourite ? handleRemoveFavorite : handleAddFavorite}
		>
			{isFavourite ? (
				<FaHeart
					className={`text-xl text-red-500 transition-all duration-300 `}
				/>
			) : (
				<FaRegHeart className={`transition-all duration-300 text-xl `} />
			)}
		</button>
	);
};

export default EpisodeFavouriteFunc;
