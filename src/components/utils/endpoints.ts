import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_BACK_URL;

export const login = async (data: any) =>
	axios.post(`${API_URL}/auth/login`, data);
