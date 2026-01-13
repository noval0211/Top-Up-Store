import axios from "axios"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    (err) => {
        const normalizedError = {
            status:
                err.response?.status ||
                err.status ||
                0,
            message:
                err.response?.data?.message ||
                err.message ||
                "Network error",
            isNetworkError: !err.response,
        };

        // optional global handling
        if (normalizedError.status === 401) {
            localStorage.removeItem("token");
        }

        return Promise.reject(normalizedError);
    }
);

export { api }