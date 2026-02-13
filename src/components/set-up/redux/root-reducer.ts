"use client";
import { combineReducers } from "redux";
import authReducer from "../../Redux/auth";
import overviewReducer from "../../Redux/overview";
import bankLogosReducer from "../../Redux/bankLogo";

export const rootReducer = combineReducers({
	auth: authReducer,
	overview: overviewReducer,
	bankLogos: bankLogosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
