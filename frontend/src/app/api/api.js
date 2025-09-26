import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL tidak terkonfigurasi di file .env Anda.");
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseHandler = async (request) => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("API call failed:", error.response || error);
    const errorMessage = error.response?.data?.error || "Terjadi kesalahan yang tidak diketahui.";
    throw new Error(errorMessage);
  }
};

export const api = {
  get: (endpoint) => responseHandler(axiosInstance.get(endpoint)),
  post: (endpoint, body) => responseHandler(axiosInstance.post(endpoint, body)),
  put: (endpoint, body) => responseHandler(axiosInstance.put(endpoint, body)),
  del: (endpoint) => responseHandler(axiosInstance.delete(endpoint)),
};
