import axios from "axios";

const $http = axios.create({
	baseURL: process.env.EXPO_PUBLIC_UDEMY_API_URL,
	// withCredentials: true,
	auth: {
		username: process.env.EXPO_PUBLIC_UDEMY_CLIENT_ID || "",
		password: process.env.EXPO_PUBLIC_UDEMY_CLIENT_SECRET || "",
	},
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default $http;
