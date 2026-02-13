import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { playPause, setActiveSong } from "../Redux/playerTwo";
import { setIsEpisodeRegistered } from "../Redux/ToggleModal";
import { RotatingLines } from "react-loader-spinner";
import { BsFillPauseFill } from "react-icons/bs";
import { IoPlayOutline } from "react-icons/io5";

interface ImagePlayButtonProps {
	title: string;
	episode: PodcastEpisode;
	EpisodePodcastsData: PodcastEpisode[];
	index: number;
	children?: ReactNode;
}

const ImagePlayButton = ({
	title,
	episode,
	EpisodePodcastsData,
	index,
	children,
}: ImagePlayButtonProps) => {
	const dispatch = useAppDispatch();
	const {
		activeSong,
		currentSongs,
		currentIndex,
		isActive,
		isPlaying,
		isLoading,
	} = useAppSelector((state) => state.playerTwo);

	const handlePauseClick = () => {
		dispatch(playPause(false));
	};

	const handlePlayClick = () => {
		dispatch(setActiveSong({ episode, EpisodePodcastsData, index }));
		dispatch(setIsEpisodeRegistered(false));
		dispatch(playPause(true));
	};
	return (
		<div
			className='relative flex items-center justify-center group cursor-pointer'
			onClick={
				isPlaying && activeSong?.title === title
					? handlePauseClick
					: handlePlayClick
			}
		>
			{children}
			<div
				className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex rounded-md ${
					activeSong?.title === title ? "flex bg-black bg-opacity-70" : "hidden"
				}`}
			>
				{isLoading && activeSong?.title === title ? (
					<RotatingLines
						strokeColor='grey'
						strokeWidth='5'
						animationDuration='0.75'
						width='32'
						visible={true}
					/>
				) : (
					<>
						{isPlaying && activeSong?.title === title ? (
							<BsFillPauseFill
								size={30}
								className='absolute text-white border rounded-full p-1 invisible group-hover:visible'
							/>
						) : (
							<IoPlayOutline
								size={30}
								className='absolute text-white border rounded-full p-1 invisible group-hover:visible'
							/>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default ImagePlayButton;
