import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Create an Axios instance with default configurations
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_API_URL || '', 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  },
});

import Cookies from "js-cookie";

// Optional: Add request interceptors (e.g., for attaching auth tokens)
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptors (e.g., for global error handling)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., 401 Unauthorized, 500 Internal Server Error)
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Generic GET Request
 * @param url The endpoint URL
 * @param config Optional Axios request configuration
 * @returns Promise with the expected response type
 */
export const apiGet = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.get(url, config);
  return response.data;
};

/**
 * Generic POST Request
 * @param url The endpoint URL
 * @param data The payload for the POST request
 * @param config Optional Axios request configuration
 * @returns Promise with the expected response type
 */
export const apiPost = async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(url, data, config);
  return response.data;
};

/**
 * Generic PUT Request
 * @param url The endpoint URL
 * @param data The payload for the PUT request
 * @param config Optional Axios request configuration
 * @returns Promise with the expected response type
 */
export const apiPut = async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.put(url, data, config);
  return response.data;
};

/**
 * Generic PATCH Request
 * @param url The endpoint URL
 * @param data The payload for the PATCH request
 * @param config Optional Axios request configuration
 * @returns Promise with the expected response type
 */
export const apiPatch = async <T, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.patch(url, data, config);
  return response.data;
};

/**
 * Generic DELETE Request
 * @param url The endpoint URL
 * @param config Optional Axios request configuration
 * @returns Promise with the expected response type
 */
export const apiDelete = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.delete(url, config);
  return response.data;
};

export default apiClient;
