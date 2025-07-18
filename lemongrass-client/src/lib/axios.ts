import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

interface ApiError {
  error: string;
}

const api = axios.create({
  baseURL: `${
    import.meta.env.VITE_API_URL || "http://localhost:3000"
  }/api/_v1/`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    const skipAuth =
      config.headers instanceof AxiosHeaders &&
      config.headers.get("x-auth-required") === "false";

    if (token && !skipAuth) {
      if (config.headers instanceof AxiosHeaders) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);


api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiError>) => Promise.reject(error)
);


export default api;
