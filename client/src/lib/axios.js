import axios from "axios";

const api = axios.create({
  baseURL: "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (typeof window !== "undefined" && status === 401) {
      const pathname = window.location.pathname;

      const isAuthPage =
        pathname === "/login" || pathname === "/register";

      const isAuthCheckRequest =
        error?.config?.url === "/api/auth/me";

      if (!isAuthPage && !isAuthCheckRequest) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;