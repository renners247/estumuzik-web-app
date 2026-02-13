import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

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
