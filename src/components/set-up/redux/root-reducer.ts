"use client";
import { combineReducers } from "redux";
import authReducer from "../../Redux/auth";
import overviewReducer from "../../Redux/overview";
import ToogleModalReducer from "../../Redux/ToggleModal";
import RefreshReducer from "../../Redux/refresh";
import socialShareReducer from "../../Redux/Share";
import bankLogosReducer from "../../Redux/bankLogo";
import playerOne from "../../Redux/playerOne";

export const rootReducer = combineReducers({
	auth: authReducer,
	refresh: RefreshReducer,
	overview: overviewReducer,
	toggleModal: ToogleModalReducer,
	playerOne: playerOne,
	bankLogos: bankLogosReducer,
	share: socialShareReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
