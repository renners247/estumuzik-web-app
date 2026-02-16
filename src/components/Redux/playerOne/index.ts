import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Ensure this matches the interface used in your PodcastCard
// export interface PodcastEpisode {
// 	id: number;
// 	title: string;
// 	content_url: string;
// 	picture_url: string;
// 	description: string;
// 	duration: number;
// 	podcast: {
// 		title: string;
// 		author: string;
// 		category_name: string;
// 	};
// }

interface PlayerState {
	currentSongs: PodcastEpisode[];
	activeSong: PodcastEpisode | null;
	currentIndex: number;
	isActive: boolean;
	isPlaying: boolean;
	isLoading: boolean;
	volume: number;
	seekTime: number;
	episodeRatings: Record<number, number>;
	idStar: number | null;
	starRating: number;
	genreListId: string;
}

const initialState: PlayerState = {
	currentSongs: [],
	activeSong: null,
	currentIndex: 0,
	isActive: false,
	isPlaying: false,
	isLoading: false,
	volume: 0.8,
	seekTime: 0,
	episodeRatings: {},
	idStar: null,
	starRating: 0,
	genreListId: "",
};

const playerSlice = createSlice({
	name: "playerOne",
	initialState,
	reducers: {
		// Called when a user clicks a PodcastCard
		setActiveSong: (
			state,
			action: PayloadAction<{
				song: PodcastEpisode;
				data?: PodcastEpisode[];
				index: number;
			}>,
		) => {
			state.activeSong = action.payload.song;

			// If a list of episodes (queue) is provided, set it. Otherwise, the queue is just this song.
			if (action.payload.data && action.payload.data.length > 0) {
				state.currentSongs = action.payload.data;
			} else {
				state.currentSongs = [action.payload.song];
			}

			state.currentIndex = action.payload.index;
			state.isActive = true;
			state.isPlaying = true; // Auto-play when selected
		},

		nextSong: (state, action: PayloadAction<number>) => {
			const nextIndex = action.payload;
			if (state.currentSongs[nextIndex]) {
				state.activeSong = state.currentSongs[nextIndex];
				state.currentIndex = nextIndex;
				state.isActive = true;
			}
		},

		prevSong: (state, action: PayloadAction<number>) => {
			const prevIndex = action.payload;
			if (state.currentSongs[prevIndex]) {
				state.activeSong = state.currentSongs[prevIndex];
				state.currentIndex = prevIndex;
				state.isActive = true;
			}
		},

		playPause: (state, action: PayloadAction<boolean>) => {
			state.isPlaying = action.payload;
		},

		setIsLoadingSong: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},

		setVolume: (state, action: PayloadAction<number>) => {
			state.volume = action.payload;
		},

		setSeekTime: (state, action: PayloadAction<number>) => {
			state.seekTime = action.payload;
		},

		// Rating logic
		setStarRatingArr: (
			state,
			action: PayloadAction<{ episodeId: number; position: number }>,
		) => {
			const { episodeId, position } = action.payload;
			state.episodeRatings[episodeId] = position;
			state.idStar = episodeId;
			state.starRating = position;
		},

		stopPlayer: (state) => {
			state.isActive = false;
			state.isPlaying = false;
			state.activeSong = null;
		},
	},
});

export const {
	setActiveSong,
	nextSong,
	prevSong,
	setSeekTime,
	playPause,
	setIsLoadingSong,
	setVolume,
	setStarRatingArr,
	stopPlayer,
} = playerSlice.actions;

export default playerSlice.reducer;
