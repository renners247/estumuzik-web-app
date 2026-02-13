// import { AUTH_TOKEN_KEY, signOut } from "@/components/utils/data";
import Cookies from "js-cookie";
import { AxiosError, AxiosStatic, InternalAxiosRequestConfig } from "axios";
import { AUTH_TOKEN_KEY, signOut } from "@/components/utils/data";
// import { API_URL } from "@/components/utils/endpoints";
// import { API_URL } from "@/components/utils/endpoints";

export default function setupAxios(axios: AxiosStatic, store: any) {
	const lendoCreditIlsAPI = "";
	axios.defaults.headers.common["Accept"] = "application/json";
	const ilsCookieToken = Cookies.get(AUTH_TOKEN_KEY);
	axios.interceptors.request.use(
		(config: any) => {
			const { auth } = store.getState(); // Destructure auth from state
			if (auth && auth.token) {
				// Check if auth and auth.token are defined
				if (config.headers && config.url.includes(lendoCreditIlsAPI)) {
					config.headers.Authorization = `Bearer ${auth.token}`;
				}
			}
			return config;
		},
		(err: any) => Promise.reject(err),
	);

	axios.interceptors.response.use(
		(response) => response,
		async (error: AxiosError) => {
			const originalRequest = error.config as InternalAxiosRequestConfig & {
				_retry?: boolean;
			};
			const { auth } = store.getState();

			if (
				ilsCookieToken &&
				error.response?.status === 401 &&
				!originalRequest._retry
			) {
				signOut();
			}

			return Promise.reject(error);
		},
	);
}
