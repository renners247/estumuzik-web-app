/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks";
import { setIsLoadingSong, playPause } from "../Redux/playerOne";
import { loadingBarRef } from "@/app/redux-provider";

interface PlayerProps {
	seekTime: number;
	onEnded: () => void;
	onTimeUpdate: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
	onLoadedData: (event: React.SyntheticEvent<HTMLAudioElement>) => void;
	repeat: boolean;
}

const Player: React.FC<PlayerProps> = ({
	seekTime,
	onEnded,
	onTimeUpdate,
	onLoadedData,
	repeat,
}) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const dispatch = useAppDispatch();
	const { activeSong, isPlaying, volume } = useAppSelector(
		(state) => state.playerOne,
	);

	// 1. Handle Play/Pause logic correctly
	useEffect(() => {
		if (!audioRef.current) return;

		if (isPlaying) {
			// Browsers return a promise on .play(). We must catch errors to prevent crashes
			// (e.g., if user hasn't interacted with the page yet)
			const playPromise = audioRef.current.play();
			if (playPromise !== undefined) {
				playPromise.catch((error) => {
					console.error("Autoplay prevented or error:", error);
					// If autoplay is blocked, sync Redux state back to paused
					dispatch(playPause(false));
				});
			}
		} else {
			audioRef.current.pause();
		}
	}, [isPlaying, activeSong]); // Trigger when play state OR song changes

	// 2. Handle Source Change & initial Checkpoint
	// Inside Player.tsx
	useEffect(() => {
		if (!audioRef.current) return;

		// When the song URL changes...
		const checkPointTime = localStorage.getItem("checkpoint");

		// If checkpoint is "0", force the player to start at the beginning
		if (checkPointTime === "0") {
			audioRef.current.currentTime = 0;
		} else if (checkPointTime && activeSong) {
			audioRef.current.currentTime = Number(checkPointTime);
		}

		dispatch(setIsLoadingSong(true));
	}, [activeSong?.content_url]);

	// 3. Sync Volume
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	// 4. Manual Seek (Scrubbing)
	useEffect(() => {
		if (
			audioRef.current &&
			Math.abs(audioRef.current.currentTime - seekTime) > 1
		) {
			audioRef.current.currentTime = seekTime;
		}
	}, [seekTime]);

	// 5. Handle Loading States
	const handleLoadStart = () => {
		dispatch(setIsLoadingSong(true));
		loadingBarRef.current?.continuousStart();
	};

	const handleCanPlay = () => {
		dispatch(setIsLoadingSong(false));
		loadingBarRef.current?.complete();
	};

	return (
		<audio
			src={activeSong?.content_url}
			ref={audioRef}
			loop={repeat}
			onEnded={onEnded}
			onTimeUpdate={onTimeUpdate}
			onLoadedData={onLoadedData}
			onLoadStart={handleLoadStart}
			onCanPlay={handleCanPlay}
			preload='auto'
		/>
	);
};

export default Player;
