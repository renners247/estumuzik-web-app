// modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
	showSignUpModal: boolean;
	showLoginModal: boolean;
	showTipsModal: boolean;
	showOtherTipsModal: boolean;
	showSocialShareModal: boolean;
	isSoftRefresh: boolean;
	showGetTokenModal: boolean;
	likedEpisodes?: Record<number | string, boolean>;
	queuedEpisodes?: Record<number | string, boolean>;
	favouriteEpisodes?: Record<number | string, boolean>;
	isEpisodeRegistered: boolean;
	showTipSuccessModal: boolean;
	isLikedEpisode: boolean;
	isSubscribedPodcast: boolean;
	showViewPlaylistModal: boolean;
	episodeToPlaylistId: number;
	isMinimizedPlayer: boolean;
	isRepeatEpisode: boolean;
}

const initialState: ModalState = {
	showSignUpModal: false,
	showLoginModal: false,
	showTipsModal: false,
	showOtherTipsModal: false,
	showSocialShareModal: false,
	isSoftRefresh: false,
	showGetTokenModal: false,
	likedEpisodes: {},
	queuedEpisodes: {},
	favouriteEpisodes: {},
	isEpisodeRegistered: false,
	showTipSuccessModal: false,
	isLikedEpisode: false,
	isSubscribedPodcast: false,
	showViewPlaylistModal: false,
	episodeToPlaylistId: 0,
	isMinimizedPlayer: false,
	isRepeatEpisode: false,
};

const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		toggleSignUpModal: (state) => {
			state.showSignUpModal = !state.showSignUpModal;
		},
		toggleLoginModal: (state) => {
			state.showLoginModal = !state.showLoginModal;
		},
		toggleTipsModal: (state) => {
			state.showTipsModal = !state.showTipsModal;
		},
		toggleOtherTipsModal: (state) => {
			state.showOtherTipsModal = !state.showOtherTipsModal;
		},
		toggleGetTokenModal: (state) => {
			state.showGetTokenModal = !state.showGetTokenModal;
		},
		toggleSocialShareModal: (state) => {
			state.showSocialShareModal = !state.showSocialShareModal;
		},
		toggleTipSuccessModal: (state) => {
			state.showTipSuccessModal = !state.showTipSuccessModal;
		},
		setIsSoftRefresh: (state) => {
			state.isSoftRefresh = !state.isSoftRefresh;
		},
		setIsLikedEpisode: (state, action: PayloadAction<number | string>) => {
			if (!state.likedEpisodes) {
				state.likedEpisodes = {}; // Initialize likedEpisodes if it's undefined
			}
			state.likedEpisodes[action.payload] = true;
		},
		setIsRemoveLikeEpisode: (state, action: PayloadAction<number | string>) => {
			if (!state.likedEpisodes) {
				state.likedEpisodes = {}; // Initialize likedEpisodes if it's undefined
			}
			state.likedEpisodes[action.payload] = false;
		},
		setIsQueuedEpisode: (state, action: PayloadAction<number | string>) => {
			if (!state.queuedEpisodes) {
				state.queuedEpisodes = {};
			}
			state.queuedEpisodes[action.payload] = true;
		},
		setIsRemoveQueueEpisode: (
			state,
			action: PayloadAction<number | string>,
		) => {
			if (!state.queuedEpisodes) {
				state.queuedEpisodes = {};
			}
			state.queuedEpisodes[action.payload] = false;
		},
		setIsFavouriteEpisode: (state, action: PayloadAction<number | string>) => {
			if (!state.favouriteEpisodes) {
				state.favouriteEpisodes = {};
			}
			state.favouriteEpisodes[action.payload] = true;
		},
		setIsRemoveFavouriteEpisode: (
			state,
			action: PayloadAction<number | string>,
		) => {
			if (!state.favouriteEpisodes) {
				state.favouriteEpisodes = {};
			}
			state.favouriteEpisodes[action.payload] = false;
		},
		setIsSubscribedPodcast: (state, action: PayloadAction<boolean>) => {
			state.isSubscribedPodcast = action.payload;
		},
		setIsEpisodeRegistered: (state, action: PayloadAction<boolean>) => {
			state.isEpisodeRegistered = action.payload;
		},
		toggleViewPlaylistModal: (state) => {
			state.showViewPlaylistModal = !state.showViewPlaylistModal;
		},
		setEpisodeToPlaylistId: (state, action: PayloadAction<number>) => {
			state.episodeToPlaylistId = action.payload;
		},
		setIsMinimizedPlayer: (state) => {
			state.isMinimizedPlayer = !state.isMinimizedPlayer;
		},
		setIsRepeatEpisode: (state, action: PayloadAction<boolean>) => {
			state.isRepeatEpisode = action.payload;
		},
	},
});

export const {
	toggleSignUpModal,
	toggleLoginModal,
	toggleTipsModal,
	toggleOtherTipsModal,
	toggleGetTokenModal,
	toggleSocialShareModal,
	setIsSoftRefresh,
	toggleTipSuccessModal,
	setIsLikedEpisode,
	setIsRemoveLikeEpisode,
	setIsSubscribedPodcast,
	toggleViewPlaylistModal,
	setEpisodeToPlaylistId,
	setIsQueuedEpisode,
	setIsEpisodeRegistered,
	setIsRemoveQueueEpisode,
	setIsFavouriteEpisode,
	setIsRemoveFavouriteEpisode,
	setIsMinimizedPlayer,
	setIsRepeatEpisode,
} = modalSlice.actions;
export default modalSlice.reducer;
