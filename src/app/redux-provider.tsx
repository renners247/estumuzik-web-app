"use client";
import store from "@/components/set-up/redux/store";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import * as _redux from "../components/set-up";
import { ToastContainer } from "react-toastify";
// @ts-ignore
import "react-toastify/dist/ReactToastify.css";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { HeroUIProvider } from "@heroui/react";
import axios from "axios";
import MusicPlayer from "@/components/MusicPlayer";

_redux.setupAxios(axios, store);
export const loadingBarRef = React.createRef<LoadingBarRef | null>();

const queryClient = new QueryClient();

export default function ReduxProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
			window.addEventListener("load", () => {
				navigator.serviceWorker
					.register("/sw.js")
					.then((reg) => console.log("Service Worker registered:", reg))
					.catch((err) =>
						console.error("Service Worker registration failed:", err),
					);
			});
		}
	}, []);

	return (
		<HeroUIProvider>
			<LoadingBar
				color='#FFC71F'
				ref={loadingBarRef as React.RefObject<LoadingBarRef>}
				height={5}
			/>
			<QueryClientProvider client={queryClient}>
				<ToastContainer position='top-right' hideProgressBar />
				<Provider store={store}>
					{children} <MusicPlayer />
				</Provider>
			</QueryClientProvider>
		</HeroUIProvider>
	);
}
