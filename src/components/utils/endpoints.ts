import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_BACK_URL;
export const BaseUrl = process.env.NEXT_PUBLIC_FRONT_URL || "";

export const login = async (data: any) =>
	axios.post(`${API_URL}/auth/login`, data);

export const trendingEpisodes = async (
	page: number = 1,
	perPage: number = 15,
) => axios.get(`${API_URL}/episodes/trending?page=${page}&per_page=${perPage}`);

export const getUser = async () => axios.get(`${API_URL}/users`);

export const updateUser = async (data: any) =>
	axios.patch(`${API_URL}/users`, data, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});

export const categories = async () => axios.get(`${API_URL}/categories`);

export const subCategories = async (
	page: number,
	per_page: number,
	name: string,
	subcategory?: string,
) =>
	axios.get(
		`${API_URL}/categories/types/${name}/trending-episodes?name=${name}${
			subcategory ? `&sub_category_name=${subcategory}` : ""
		}&page=${page}&per_page=${per_page}`,
	);
export const episodePodcast = async (
	podcastId: string,
	page: number,
	per_page: number,
	q = "",
) =>
	axios.get(
		`${API_URL}/podcasts/${podcastId}/episodes?${
			q ? `&q=${q}` : ""
		}&page=${page}&per_page=${per_page}`,
	);

export const topJolly = async (page: number, per_page: number) =>
	axios.get(`${API_URL}/podcasts/top-jolly?page=${page}&per_page=${per_page}`);

export const getLatestEpisodes = async () =>
	axios.get(`${API_URL}/episodes/latest`);

export const getHandPicked = async (amount: number) =>
	axios.get(`${API_URL}/podcasts/handpicked?amount=${amount}`);

export const getRecentlyPlayed = async (page: number, per_page: number) =>
	axios.get(
		`${API_URL}/episodes/plays?${page ? `page=${page}` : ""}${
			per_page ? `&per_page=${per_page}` : ""
		}`,
	);

export const getFavorites = async (page: number, per_page: number) =>
	axios.get(
		`${API_URL}/episodes/favourites?${page ? `page=${page}` : ""}${
			per_page ? `&per_page=${per_page}` : ""
		}`,
	);

export const addFavorite = async (episodeId: number) =>
	axios.post(`${API_URL}/episodes/favourites?episodeId=${episodeId}`);

export const removeFromFavorites = async (episodeId: number) =>
	axios.delete(`${API_URL}/episodes/favourites?episodeId=${episodeId}`);

export const subscribeToPodcast = async (podcastId: number) =>
	axios.post(`${API_URL}/podcasts/${podcastId}/subscriptions`);

export const unsubscribeFromPodcast = async (podcastId: number) =>
	axios.delete(`${API_URL}/podcasts/${podcastId}/subscriptions`);

export const addToQueue = async (episodeId: number) =>
	axios.post(`${API_URL}/episodes/${episodeId}/queues`);

export const registerPlayEpisode = async (episodeId: number) =>
	axios.post(`${API_URL}/episodes/plays?episodeId=${episodeId}`);

export const removeQueue = async (episodeId: number) =>
	axios.delete(`${API_URL}/episodes/${episodeId}/queues`);

export const getEpisodeStatus = async (statusId: number) =>
	axios.get(`${API_URL}/episodes/${statusId}/status`);

export const getPodcastsStatus = async (statusId: number) =>
	axios.get(`${API_URL}/podcasts/${statusId}/status`);

export const getEpisode = async (episodeId: number) =>
	axios.get(`${API_URL}/episodes/${episodeId}`);

export const getEpisodeComments = async (episodeId: number) =>
	axios.get(`${API_URL}/episodes/${episodeId}/comments`);

export const getPodcast = async (podcastId: number) =>
	axios.get(`${API_URL}/podcasts/${podcastId}`);

export const getPlaylists = async (
	page: number,
	per_page: number,
	name: string,
) =>
	axios.get(
		`${API_URL}/playlists?${page ? `page=${page}` : ""}${
			per_page ? `&per_page=${per_page}` : ""
		}${name ? `&name=${name}` : ""}`,
	);

export const getPlaylistsEpisodes = async (
	playlistId: number,
	page: number,
	per_page: number,
) =>
	axios.get(
		`${API_URL}/playlists/${playlistId}/episodes?${page ? `page=${page}` : ""}${
			per_page ? `&per_page=${per_page}` : ""
		}`,
	);

export const getEditorPick = async () =>
	axios.get(`${API_URL}/episodes/editor-pick`);

export const getCategoryPodcasts = async (
	category: string,
	subcategory: string,
	page: number,
	per_page: number,
) =>
	axios.get(
		`${API_URL}/categories/types/${category}/podcasts?${
			subcategory ? `&sub_category_name=${subcategory}` : ""
		}&page=${page}&per_page=${per_page}`,
	);

export const updatePassword = async (data: {
	phone_number: string;
	old_password: string;
	new_password: string;
}) => axios.patch(`${API_URL}/users/change-password`, data);

export const getUserStatus = async (userId: number) =>
	axios.get(`${API_URL}/users/${userId}/status`);
