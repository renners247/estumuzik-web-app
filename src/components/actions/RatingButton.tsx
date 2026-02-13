"use client";
import { getEpisodeRating, rateEpisode, removeRatedEpisode } from "@/api/Auth";
import { APICall } from "@/utils/extras";
import { useMutation, useQuery } from "react-query";
import { setStarRating, setStarRatingArr } from "../Redux/playerTwo";
import {
	setIsLikedEpisode,
	setIsSoftRefresh,
	toggleLoginModal,
} from "../Redux/ToggleModal";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { FaStar } from "react-icons/fa";
import { RatingData, RatingResponse } from "@/Models/Episodes";
import { useEffect, useState } from "react";
import { setIsRatingRefresh } from "../Redux/refresh";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "@/utils/data";

interface RatingButtonProps {
	episodeId: number;
	averageRating: number | null;
	className?: string;
}

const RatingButton: React.FC<RatingButtonProps> = ({
	episodeId,
	averageRating,
	className,
	...props
}) => {
	const user = useAppSelector((state) => state.auth.user);
	const dispatch = useAppDispatch();
	const [episodeRatingsLocal, setEpisodeRatingsLocal] = useState<
		Record<number, number>
	>({});
	const { episodeRatings } = useAppSelector((state) => state.playerTwo);
	const { isRatingRefresh } = useAppSelector((state) => state.refresh);
	const laudrListenerCookieToken = Cookies.get(AUTH_TOKEN_KEY);
	// const ratingForEpisode = (episodeRatings && episodeRatings[episodeId]) || 0;

	const {
		data: episodeRatingData,
		isLoading: episodeRatingIsLoading,
		refetch: refetchEpisodeRating,
	} = useQuery(
		["EpisodeRating", episodeId],
		async () => {
			if (user?.email_verified_at && episodeId) {
				const response = await APICall(
					getEpisodeRating,
					[episodeId],
					false,
					false,
				);

				// Extracting data from the response
				const position = response?.data?.data?.rating?.stars;

				// Assuming setStarRatingArr is a function that sets state
				// dispatch(setStarRatingArr({ episodeId, position }));

				return position;
			}
		},
		{
			staleTime: Infinity,
			enabled: !!user?.email_verified_at || !!laudrListenerCookieToken,
		},
	);

	useEffect(() => {
		if (user && episodeId) {
			refetchEpisodeRating();
		}
	}, [isRatingRefresh]);

	useEffect(() => {
		setEpisodeRatingsLocal((prev) => ({
			...prev,
			[episodeId]: episodeRatingData,
		}));
	}, [episodeRatingData]);

	// console.log(episodeRatingsLocal[episodeId]);
	// const EpisodeRatingData: RatingResponse = episodeRatingData;

	const handleRateEpisode = async (
		episodeId: number | null,
		position: number,
		comments: string | null,
	) => {
		try {
			await rateEpisodeMutation.mutateAsync({ episodeId, position, comments });
		} catch (error: any) {
			setEpisodeRatingsLocal((prev) => ({
				...prev,
				[episodeId as any]: position,
			}));
			// dispatch(setStarRatingArr({ episodeId, position }));
			setEpisodeRatingsLocal((prev) => ({
				...prev,
				[episodeId as any]: position,
			}));
		}
	};

	const handleRemoveRatedEpisode = async (position: number | string) => {
		try {
			// Use the mutate function provided by useMutation
			await removeRatingEpisodeMutation.mutateAsync(position);
		} catch (error) {}
	};

	const rateEpisodeMutation = useMutation(
		({
			episodeId,
			position,
			comments,
		}: {
			episodeId: number | string | null;
			position: number;
			comments: string | null;
		}) => APICall(rateEpisode, [episodeId, position, comments], false, false),
		{
			onSuccess: (data, variables) => {
				// Handle success if needed
				const { episodeId, position }: any = variables;
				setEpisodeRatingsLocal((prev) => ({
					...prev,
					[episodeId as any]: position,
				}));
				// dispatch(setStarRatingArr({ episodeId, position }));
				dispatch(setIsRatingRefresh());
			},
		},
	);

	const removeRatingEpisodeMutation = useMutation(
		(position: number | string) =>
			APICall(removeRatedEpisode, position, false, false),
		{
			onSuccess: (data, variables) => {
				const { position }: any = variables; // Destructure position from variables
				// Handle success if needed
				dispatch(setIsRatingRefresh());
			},
		},
	);

	const handleRateEpisodeClick = (
		episodeId: number | null,
		position: number,
	) => {
		if (user) {
			if (!rateEpisodeMutation.isLoading) {
				setEpisodeRatingsLocal((prev) => ({
					...prev,
					[episodeId as any]: position,
				}));
				handleRateEpisode(episodeId, position, null);
			}
		} else {
			dispatch(toggleLoginModal());
		}
	};

	return (
		<div
			className={`flex justify-center items-center w-fit gap-1.5 ${className}`}
		>
			<div className='flex w-fit h-fit gap-1'>
				{[1, 2, 3, 4, 5].map((position) => (
					<FaStar
						key={position}
						onClick={() => handleRateEpisodeClick(episodeId, position)}
						color={
							// position <= EpisodeRatingData?.data?.rating?.stars
							episodeRatingsLocal && position <= episodeRatingsLocal[episodeId]
								? "#7B61FF"
								: "#BEBEBE"
						}
						className='cursor-pointer w-3.5 h-3.5 lg:w-4 lg:h-4'
					/>
				))}
			</div>
			<span className='font-medium text-xs h-3.5 text-white/80'>
				{averageRating ? averageRating : "0.0"}
			</span>
		</div>
	);
};

export default RatingButton;
