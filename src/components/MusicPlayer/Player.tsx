/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect, ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { playPause, setIsLoadingSong } from "../Redux/playerOne";
import { loadingBarRef } from "@/app/redux-provider";

interface PlayerProps {
	seekTime: number;
	onEnded: () => void;
	onTimeUpdate: (event: ChangeEvent<HTMLAudioElement>) => void;
	onLoadedData: (event: ChangeEvent<HTMLAudioElement>) => void;
	repeat: boolean;
	checkpoint?: number;
}

const Player: React.FC<PlayerProps> = ({
	seekTime,
	onEnded,
	onTimeUpdate,
	onLoadedData,
	repeat,
	checkpoint,
}) => {
	const { volume } = useAppSelector((state) => state.playerOne);
	const ref = useRef<HTMLAudioElement>(null);
	const { activeSong, isPlaying, isLoading } = useAppSelector(
		(state) => state.playerOne,
	);
	const dispatch = useAppDispatch();
	useEffect(() => {
		const episodeIsPlaying = localStorage.getItem("isEpisodePlaying");
		if (isPlaying) {
			if (episodeIsPlaying) {
				ref.current!.play();
			}
		} else {
			dispatch(setIsLoadingSong(false));
			ref.current!.pause();
		}
	}, [isPlaying, activeSong, dispatch]);

	const playAudio = () => {
		if (ref.current) {
			ref.current.play();
		}
	};

	useEffect(() => {
		if (isPlaying || isLoading) {
			ref.current!.pause();
		} else {
			// dispatch(pause(false));
		}
		// dispatch(playPause(false));
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current.volume = volume;
		}
	}, [volume]);

	useEffect(() => {
		if (ref.current) {
			ref.current.currentTime = seekTime;
		}
	}, [seekTime]);

	useEffect(() => {
		const checkPointTime = localStorage.getItem("checkpoint");
		if (ref.current) {
			if (checkPointTime) {
				ref.current.currentTime = Number(checkPointTime);
			}
		}
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current.loop = repeat;
		}
	}, [repeat]);

	const handleLoadingClick = () => {
		dispatch(setIsLoadingSong(true));
		loadingBarRef.current?.continuousStart();
	};

	return (
		<audio
			src={activeSong?.content_url}
			ref={ref}
			loop={repeat}
			onEnded={onEnded}
			onTimeUpdate={onTimeUpdate}
			onLoadedData={onLoadedData}
			onLoadStart={handleLoadingClick}
		/>
	);
};

export default Player;
