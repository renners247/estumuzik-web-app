import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks";
import {
	setIsQueuedEpisode,
	setIsRemoveQueueEpisode,
	toggleLoginModal,
} from "../Redux/ToggleModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import TooltipWrapper from "../common/TooltipWrapper";
import { PiQueueBold } from "react-icons/pi";
import { setIsQueueRefresh } from "../Redux/refresh";
import Cookies from "js-cookie";
import { AUTH_TOKEN_KEY } from "../utils/data";

interface QueueButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	episodeId: number;
	color?: string;
}

const QueueButton: React.FC<QueueButtonProps> = ({
	episodeId,
	color = "white",
	...props
}) => {
	const { isQueueRefresh } = useAppSelector((state) => state.refresh);
	const user = useAppSelector((state) => state.auth.user);
	const laudrListenerCookieToken = Cookies.get(AUTH_TOKEN_KEY);
	const dispatch = useAppDispatch();

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

	useEffect(() => {
		if (user) {
			// refetchStatus();
		}
	}, [isQueueRefresh]);

	// const StatusData: EpisodeStatusResponse = statusData;

	const [queued, setQueued] = useState(false);

	// useEffect(() => {
	// 	if (user) {
	// 		setQueued(StatusData?.data?.is_queued);
	// 	}
	// }, [StatusData]);

	const handleQueueEpisode = async (episodeId: number) => {
		setQueued(true);
		try {
			// dispatch(setIsQueuedEpisode(episodeId));
			// await queueEpisodeMutation.mutateAsync(episodeId);
			dispatch(setIsQueueRefresh());
		} catch (error: any) {
			if (
				error.response.data.message ===
				"This episode has already been added to the queue"
			) {
				dispatch(setIsQueueRefresh());
			}
		}
	};

	const handleRemoveQueueEpisode = async (episodeId: number | string) => {
		setQueued(false);
		try {
			// dispatch(setIsRemoveQueueEpisode(episodeId));
			// await removeQueueEpisodeMutation.mutateAsync(episodeId);
			dispatch(setIsQueueRefresh());
		} catch (error) {
			// dispatch(setIsQueuedEpisode(episodeId));
			dispatch(setIsQueueRefresh());
			setQueued(true);
		}
	};

	const handleQueue = async (episodeId: number) => {
		// const isQueued = queuedEpisodes ? queuedEpisodes[episodeId] : false;

		if (user) {
			// if (!queueEpisodeMutation.isLoading) {
			// if (StatusData?.data?.is_queued) {
			// 	handleRemoveQueueEpisode(episodeId);
			// } else {
			// 	handleQueueEpisode(episodeId);
			// }

			dispatch(setIsQueueRefresh());
		} else {
			dispatch(toggleLoginModal());
		}
	};

	// const queueEpisodeMutation = useMutation(
	// 	(episodeId: number | string) =>
	// 		APICall(addToQueue, episodeId, false, false),
	// 	{
	// 		onSuccess: (data, variables) => {
	// 			const { episodeId }: any = variables; // Destructure episodeId from variables
	// 			// Handle success if needed
	// 			// dispatch(setIsQueuedEpisode(episodeId));
	// 			dispatch(setIsQueueRefresh());
	// 		},
	// 	},
	// );

	// const removeQueueEpisodeMutation = useMutation(
	// 	(episodeId: number | string) =>
	// 		APICall(removeFromQueue, episodeId, false, false),
	// 	{
	// 		onSuccess: (data, variables) => {
	// 			const { episodeId }: any = variables; // Destructure episodeId from variables
	// 			// Handle success if needed
	// 			// dispatch(setIsRemoveQueueEpisode(episodeId));
	// 			dispatch(setIsQueueRefresh());
	// 		},
	// 	},
	// );

	return (
		<button
			onClick={() => {
				handleQueue(episodeId);
			}}
			className='transition-all duration-500 ease-in-out hover:scale-110'
		>
			{/* {queueEpisodeMutation.isLoading ||
			removeQueueEpisodeMutation.isLoading ? (
				<ClipLoader size={18} color='#A4CA38' />
			) : (
				<TooltipWrapper
					content={`${
						StatusData?.data?.is_queued ? "Remove from queue" : "Add to queue"
			
					}`}
					position='top'
				>
					<SvgBurgerIcon
						className={`cursor-pointer`}
						fill={
							StatusData?.data?.is_queued ? "#A4CA38" : color
					
						}
					/>
				</TooltipWrapper>
			)} */}
		</button>
	);
};

export default QueueButton;
