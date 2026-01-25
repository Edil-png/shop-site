import axios, { AxiosError } from "axios";

const API_URL = "http://localhost:5000";

const api = axios.create({
  baseURL:  API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error("API Error Details:", {
      message: error.message || "Нет сообщения об ошибке",
      status: error.response?.status || "Нет статуса",
      url: error.config?.url || "Неизвестный URL",
      method: error.config?.method || "Неизвестный метод",
      data: error.response?.data || "Нет данных",
      code: error.code || "Нет кода",
    });

    // Если это 404, не выбрасываем ошибку дальше
    if (error.response?.status === 404) {
      console.warn("Ресурс не найден, возвращаем пустой ответ");
      return Promise.resolve({ data: [] });
    }

    return Promise.reject(error);
  },
);

export default api;
