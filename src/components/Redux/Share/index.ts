// modalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SocialShareState {
	SocialShareId: number | null;
	SocialShareEpisode: any | null;
	searchValue: string;
}

const initialState: SocialShareState = {
	SocialShareId: null,
	SocialShareEpisode: null,
	searchValue: "",
};

const socialShareSlice = createSlice({
	name: "socialShare",
	initialState,
	reducers: {
		setSocialShareId: (state, action: PayloadAction<number>) => {
			state.SocialShareId = action.payload;
		},
		clearSocialShareId: (state) => {
			state.SocialShareId = null;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setSocialShareEpisode: (state, action: PayloadAction<any>) => {
			state.SocialShareEpisode = action.payload;
		},
		clearSearchValue: (state) => {
			state.searchValue = "";
		},
	},
});

export const {
	setSocialShareId,
	clearSocialShareId,
	setSearchValue,
	setSocialShareEpisode,
	clearSearchValue,
} = socialShareSlice.actions;
export default socialShareSlice.reducer;
