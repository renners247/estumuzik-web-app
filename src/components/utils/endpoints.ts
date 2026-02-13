import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const login = async (data: any) =>
	axios.post(`${API_URL}/auth/login`, data);

export const trendingEpisodes = async (
	page: number = 1,
	perPage: number = 15,
) => axios.get(`${API_URL}/episodes/trending?page=${page}&per_page=${perPage}`);

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
