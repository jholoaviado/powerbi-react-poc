import qs from 'qs';
import { axiosInstance, axiosInstanceEntra } from './axios'
import { TAuth, TGetDashboardsResponse, TGetReportsResponse } from './schemas'
import { CLIENT_ID, CLIENT_SECRET } from '../constants';

export const getReports = async () => {
	const response = await axiosInstance.get('/reports')
	return response.data as TGetReportsResponse
}

export const getDashboards = async () => {
	const response = await axiosInstance.get('/dashboards')
	return response.data as TGetDashboardsResponse
}

export const refreshToken = async () => {
	const refreshToken = localStorage.getItem('refreshToken');
	
	const data = qs.stringify({
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		refresh_token: refreshToken,
		grant_type: 'refresh_token',
		scope: 'offline_access https://analysis.windows.net/powerbi/api/.default',
	});
	
	console.log('data', data);
	
	const response = await axiosInstanceEntra.post('/token', data)
	
	console.log('response', response);

	return response.data as TAuth
}

export const tokenExchange = async (code: string) => {	
	const data = qs.stringify({
		code: code,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
		grant_type: 'authorization_code',
		redirect_uri: 'http://localhost:5173',
		scope: 'offline_access https://analysis.windows.net/powerbi/api/.default',
	});
	
	console.log('data', data);
	
	const response = await axiosInstanceEntra.post('/token', data)
	
	console.log('response', response);

	return response.data as TAuth
}