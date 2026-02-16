import { ButtonHTMLAttributes, ReactNode } from "react";
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { playPause, setActiveSong } from "../Redux/playerOne";
import { useQuery } from "react-query";
import { setIsEpisodeRegistered, setIsSoftRefresh } from "../Redux/ToggleModal";
import { RotatingLines } from "react-loader-spinner";
import { APICall } from "../utils/extra";
import { getEpisode } from "../utils/endpoints";

interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	episode: any;
	children?: ReactNode;
	className?: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({
	episode,
	children,
	className,
	...props
}) => {
	const dispatch = useAppDispatch();

	const { data: EpisodePodcastsData, isLoading: episodeDataIsLoading } =
		useQuery(
			["episodePodcast", episode?.podcast_id],
			async () => {
				if (episode?.podcast_id) {
					const response = await APICall(getEpisode, [episode?.podcast_id]);
					return response.data;
				}
			},
			{
				staleTime: Infinity,
				keepPreviousData: true,
				notifyOnChangeProps: "tracked",
			},
		);

	const { isPlaying, activeSong, isLoading } = useAppSelector(
		(state) => state.playerOne,
	);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};
	const index = episode?.id;

	const handlePlayClick = () => {
		// dispatch(setActiveSong({ episode, EpisodePodcastsData, index }));
		dispatch(setIsEpisodeRegistered(false));
		dispatch(playPause(true));
		dispatch(setIsSoftRefresh());
	};

	// console.log(episode);
	return (
		<button
			className={className}
			onClick={
				isPlaying && activeSong?.title === episode?.title
					? handlePauseClick
					: handlePlayClick
			}
		>
			{children}
			{isLoading && activeSong?.title === episode?.title ? (
				<RotatingLines
					strokeColor='grey'
					strokeWidth='5'
					animationDuration='0.75'
					width='18'
					visible={true}
				/>
			) : (
				<>
					{isPlaying && activeSong?.title === episode?.title ? (
						<FaRegCirclePause size={20} />
					) : (
						<FaRegCirclePlay size={20} />
					)}
				</>
			)}
		</button>
	);
};

export default PlayButton;
