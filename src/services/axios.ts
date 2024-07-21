import axios from 'axios';

const POWERBI_URL = 'https://api.powerbi.com/v1.0/myorg'

export const axiosInstance = axios.create({
	baseURL: POWERBI_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	}
);