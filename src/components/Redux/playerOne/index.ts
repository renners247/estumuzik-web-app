import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
	currentSongs: any[];
	idStar: number | null;
	episodeRatings: Record<number, number>;
	seekTime: number;
	starRating: number;
	currentIndex: number;
	isActive: boolean;
	isPlaying: boolean;
	isLoading: boolean;
	volume: number;
	activeSong: any;
	genreListId: string;
}

const initialState: PlayerState = {
	currentSongs: [],
	idStar: null,
	episodeRatings: {},
	seekTime: 0,
	starRating: 0,
	currentIndex: 0,
	isActive: false,
	isPlaying: false,
	volume: 0.8,
	isLoading: false,
	activeSong: null,
	genreListId: "",
};

const playerSlice = createSlice({
	name: "playerOne",
	initialState,
	reducers: {
		setActiveSong: (
			state,
			action: PayloadAction<{
				episode: any;
				EpisodePodcastsData: any[];
				index: number;
			}>,
		) => {
			state.activeSong = action.payload.episode;

			if (action.payload?.EpisodePodcastsData[0]?.content_url) {
				state.currentSongs = action.payload.EpisodePodcastsData;
			}
			// else if (action.payload?.EpisodePodcastsData[0]?.podcast_id) {
			//   state.currentSongs = action.payload?.EpisodePodcastsData?.tracks;
			// }
			else {
				state.currentSongs = action.payload.EpisodePodcastsData;
			}

			state.currentIndex = action.payload.index;
			state.isActive = true;
		},

		nextSong: (state, action: PayloadAction<number>) => {
			if (state.currentSongs[action.payload]?.content_url) {
				state.activeSong = state.currentSongs[action.payload];
			} else {
				state.activeSong = state.currentSongs[action.payload];
			}

			state.currentIndex = action.payload;
			state.isActive = true;
		},

		prevSong: (state, action: PayloadAction<number>) => {
			if (state.currentSongs[action.payload]?.content_url) {
				state.activeSong = state.currentSongs[action.payload];
			} else {
				state.activeSong = state.currentSongs[action.payload];
			}

			state.currentIndex = action.payload;
			state.isActive = true;
		},
		playPause: (state, action: PayloadAction<boolean>) => {
			state.isPlaying = action.payload;
		},
		setIsLoadingSong: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		selectGenreListId: (state, action: PayloadAction<string>) => {
			state.genreListId = action.payload;
		},
		setStarRating: (
			state,
			action: PayloadAction<{ episodeId: number | null; position: number }>,
		) => {
			state.idStar = action.payload.episodeId;
			state.starRating = action.payload.position;
		},
		setVolume: (state, action) => {
			state.volume = action.payload;
		},
		setSeekTime: (state, action: PayloadAction<number>) => {
			state.seekTime = action.payload;
		},
		setStarRatingArr: (
			state,
			action: PayloadAction<{ episodeId: number | null; position: number }>,
		) => {
			const { episodeId, position } = action.payload;
			if (episodeId !== null) {
				if (!state.episodeRatings) {
					state.episodeRatings = {}; // Initialize likedEpisodes if it's undefined
				}
				state.episodeRatings[episodeId] = position;
			}
			state.idStar = episodeId;
			state.starRating = position;
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
	selectGenreListId,
	setStarRating,
	setVolume,
	setStarRatingArr,
} = playerSlice.actions;

export default playerSlice.reducer;
