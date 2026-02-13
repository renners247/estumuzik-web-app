"use client";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import TooltipWrapper from "../common/TooltipWrapper";
import { useMutation, useQuery, useQueryClient } from "react-query";
// import likeAnimationData from "../../../public/animations/Like.json";
import likeAnimationData from "../../../public/animations/love.json";
import Lottie, { useLottie } from "lottie-react";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { toggleLoginModal } from "../Redux/ToggleModal";
// import { EpisodeStatusResponse } from "@/Models/Episodes";
import { setIsFavouriteRefresh } from "../Redux/refresh";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "../utils/data";

interface LikeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	episodeId: number;
	like_count?: number;
	color?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({
	episodeId,
	like_count,
	color = "white",
	...props
}) => {
	const { isFavouriteRefresh } = useAppSelector((state) => state.refresh);
	const user = useAppSelector((state) => state.auth.user);
	const laudrListenerCookieToken = Cookies.get(AUTH_TOKEN_KEY);
	const [pendingLikeAction, setPendingLikeAction] = useState<any>(null);
	const LottieHeartAnimation = {
		animationData: likeAnimationData,
		loop: true,
	};
	const { View } = useLottie(LottieHeartAnimation);

	const [isAnimationVisible, setIsAnimationVisible] = useState(false);

	// const {
	// 	data: statusData,
	// 	isLoading: statusIsLoading,
	// 	refetch: refetchStatus,
	// } = useQuery(
	// 	["status", episodeId],
	// 	async () => {
	// 		if (user?.email_verified_at && episodeId) {
	// 			const response = await APICall(
	// 				getEpisodeStatus,
	// 				[episodeId],
	// 				false,
	// 				false,
	// 			);
	// 			return response.data;
	// 		}
	// 	},
	// 	{
	// 		staleTime: Infinity,
	// 		enabled: !!user?.email_verified_at || !!laudrListenerCookieToken,
	// 	},
	// );

	// useEffect(() => {
	// 	if (user?.email_verified_at) {
	// 		refetchStatus();
	// 	}
	// }, [isFavouriteRefresh]);

	// const StatusData: any = statusData;

	const [liked, setLiked] = useState(false);

	const dispatch = useAppDispatch();

	// useEffect(() => {
	// 	if (user) {
	// 		setLiked(StatusData?.data?.is_liked);
	// 		// if (liked) {
	// 		// 	setIsAnimationVisible(true);

	// 		// 	// Play the animation and set a timeout to hide it after the animation duration
	// 		// 	setTimeout(() => {
	// 		// 		setIsAnimationVisible(false);
	// 		// 	}, 1000);
	// 		// }
	// 	}
	// }, [StatusData?.data?.is_liked]);

	// const queryClient = useQueryClient();

	const handleLikeEpisode = async (episodeId: number | string) => {
		// setLiked(true);
		try {
			// Optimistic update
			// Use the mutate function provided by useMutation
			// dispatch(setIsLikedEpisode(episodeId));

			// await likeEpisodeMutation.mutateAsync(episodeId);
			// await addFavouriteMutation.mutateAsync(episodeId);
			dispatch(setIsFavouriteRefresh());
		} catch (error: any) {
			// Revert the change if the mutation fails

			if (
				error?.response?.data?.message ===
				"This episode has already been liked."
			) {
				// Handle the case when the episode has already been liked
				// dispatch(setIsLikedEpisode(episodeId));
				dispatch(setIsFavouriteRefresh());
			}
			// setLiked(false);
		}
	};

	const handleRemoveLikeEpisode = async (episodeId: number | string) => {
		// setLiked(false);
		try {
			// Use the mutate function provided by useMutation
			// dispatch(setIsRemoveLikeEpisode(episodeId));
			// await removeLikeEpisodeMutation.mutateAsync(episodeId);
			// await removeFavouriteMutation.mutateAsync(episodeId);
		} catch (error) {
			// Revert the change if the mutation fails
			// Handle error if needed
			// dispatch(setIsLikedEpisode(episodeId));
			dispatch(setIsFavouriteRefresh());
			// setLiked(true);
		}
	};

	// const likeEpisodeMutation = useMutation(
	// 	(episodeId: number | string) =>
	// 		APICall(likeEpisode, episodeId, false, false),
	// 	{
	// 		onSuccess: (data, variables) => {
	// 			const { episodeId }: any = variables; // Destructure episodeId from variables
	// 			// Handle success if needed
	// 			// dispatch(setIsLikedEpisode(episodeId));
	// 			dispatch(setIsFavouriteRefresh());
	// 		},
	// 	},
	// );

	// const addFavouriteMutation = useMutation(
	// 	(episodeId: number | string) =>
	// 		APICall(addFavourites, episodeId, false, false),
	// 	{
	// 		onSuccess: (data, variables) => {
	// 			const { episodeId }: any = variables;
	// 			// dispatch(setIsFavouriteEpisode(episodeId));
	// 			dispatch(setIsFavouriteRefresh());
	// 		},
	// 	},
	// );

	// const removeLikeEpisodeMutation = useMutation(
	// 	(episodeId: number | string) =>
	// 		APICall(removeLikeEpisode, episodeId, false, false),
	// 	{
	// 		onSuccess: (data, variables) => {
	// 			const { episodeId }: any = variables; // Destructure episodeId from variables
	// 			// Handle success if needed
	// 			// dispatch(setIsRemoveLikeEpisode(episodeId));
	// 			dispatch(setIsFavouriteRefresh());
	// 		},
	// 	},
	// );

	// const removeFavouriteMutation = useMutation(
	// 	(episodeId: number | string) =>
	// 		APICall(removeFromFavourites, episodeId, false, false),
	// 	{
	// 		onSuccess: (data, variables) => {
	// 			const { episodeId }: any = variables;
	// 			// dispatch(setIsRemoveFavouriteEpisode(episodeId));
	// 			dispatch(setIsFavouriteRefresh());
	// 		},
	// 	},
	// );

	// const isLiked =  likedEpisodes ? likedEpisodes[episodeId] : false
	const handleLikeEpisodeClick = async (episodeId: number) => {
		if (user) {
			// Animation state change
			setIsAnimationVisible(true);

			// Play the animation and set a timeout to hide it after the animation duration
			setTimeout(() => {
				setIsAnimationVisible(false);
			}, 1000);
			// If there is a pending action, cancel it
			if (pendingLikeAction !== null) {
				clearTimeout(pendingLikeAction);
			}
			if (liked) {
				setLiked(false);
			} else {
				setLiked(true);
			}
			// Set a new pending action with a delay of 3 seconds
			const newPendingAction = setTimeout(() => {
				// Check the liked state and perform the corresponding action
				// if (!likeEpisodeMutation.isLoading) {
				// 	if (StatusData?.data?.is_liked && liked) {
				// 		handleRemoveLikeEpisode(episodeId);
				// 	} else if (!StatusData?.data?.is_liked && !liked) {
				// 		handleLikeEpisode(episodeId);
				// 	}
				// }

				// Clear the pending action after it's executed
				setPendingLikeAction(null);
			}, 3000);

			// Set the new pending action in the state
			setPendingLikeAction(newPendingAction);

			dispatch(setIsFavouriteRefresh());
		} else {
			dispatch(toggleLoginModal());
		}
	};

	return (
		<div
			className={`${
				like_count! >= 0 ? "flex flex-col items-center justify-center" : ""
			} relative`}
		>
			<button
				onClick={() => {
					handleLikeEpisodeClick(episodeId);
				}}
				// disabled={
				// 	likeEpisodeMutation.isLoading || removeLikeEpisodeMutation.isLoading
				// }
				className='flex items-center justify-center transition-all duration-500 ease-in-out hover:scale-90'
			>
				{/* {likeEpisodeMutation.isLoading ||
				removeLikeEpisodeMutation.isLoading ? (
					<div className='w-8 h-[1.2rem]'>
						<ClipLoader size={20} color='#E51D35' />
					</div>
				) : ( */}
				<TooltipWrapper
					content={`${
						// likedEpisodes && likedEpisodes[episodeId]
						// StatusData?.data?.is_liked
						liked ? "Remove from favourites" : "Save to favourites"
						// liked ? "Remove from favourites" : "Save to favourites"
					}`}
					position='top'
				>
					<div className='w-8'>
						<BsFillHeartFill
							// size={18}
							color={liked ? "#E51D35" : color}
							className={`${
								isAnimationVisible && "hidden"
							} cursor-pointer w-8 h-[1.3rem]`}
						/>
					</div>
					{isAnimationVisible && (
						<div className='w-8'>
							<Lottie
								animationData={likeAnimationData}
								loop={true}
								className={`${
									isAnimationVisible && "visible"
								} w-8 h-[2.2rem] mx-auto`}
							/>
						</div>
					)}
				</TooltipWrapper>
				{/* )} */}
			</button>
			{like_count! >= 0 && (
				<span
					className={`text-[#919191] font-normal text-[9px] absolute ${
						isAnimationVisible ? "top-8" : "top-6"
					}`}
				>
					{like_count}
				</span>
			)}
		</div>
	);
};

export default LikeButton;
