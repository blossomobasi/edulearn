import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Config from "@env";

export const config: AxiosRequestConfig = {
	baseURL: Config.UDEMY_API_URL,
	timeout: 30000, // 30 seconds
	headers: {
		"Content-Type": "application/json",
	},
};

const $http: AxiosInstance = axios.create(config);

export default $http;
