import { axiosInstance } from './axios'
import { TGetDashboardsResponse, TGetReportsResponse } from './schemas'

export const getReports = async () => {
	const response = await axiosInstance.get('/reports')
	return response.data as TGetReportsResponse
}

export const getDashboards = async () => {
	const response = await axiosInstance.get('/dashboards')
	return response.data as TGetDashboardsResponse
}
