// modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
	isRatingRefresh: boolean;
	isFavouriteRefresh: boolean;
	isQueueRefresh: boolean;
	isPlaylistRefresh: boolean;
	isSubscribedRefresh: boolean;
}

const initialState: ModalState = {
	isRatingRefresh: false,
	isFavouriteRefresh: false,
	isQueueRefresh: false,
	isPlaylistRefresh: false,
	isSubscribedRefresh: false,
};

const refreshSlice = createSlice({
	name: "refresh",
	initialState,
	reducers: {
		setIsRatingRefresh: (state) => {
			state.isRatingRefresh = !state.isRatingRefresh;
		},
		setIsFavouriteRefresh: (state) => {
			state.isFavouriteRefresh = !state.isFavouriteRefresh;
		},
		setIsQueueRefresh: (state) => {
			state.isQueueRefresh = !state.isQueueRefresh;
		},
		setIsPlaylistRefresh: (state) => {
			state.isPlaylistRefresh = !state.isPlaylistRefresh;
		},
		setIsSubscribedRefresh: (state) => {
			state.isSubscribedRefresh = !state.isSubscribedRefresh;
		},
	},
});

export const {
	setIsRatingRefresh,
	setIsFavouriteRefresh,
	setIsQueueRefresh,
	setIsPlaylistRefresh,
	setIsSubscribedRefresh,
} = refreshSlice.actions;
export default refreshSlice.reducer;
