import axios from 'axios';

export const POWERBI_URL = 'https://api.powerbi.com/v1.0/myorg'
export const ENTRA_URL = 'https://login.microsoftonline.com/organizations/oauth2/v2.0'

export const axiosInstance = axios.create({
	baseURL: POWERBI_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export const axiosInstanceEntra = axios.create({
	baseURL: ENTRA_URL,
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
		'origin': 'http://localhost:5173',
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