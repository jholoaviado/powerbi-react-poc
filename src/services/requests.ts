import { axiosInstance } from './axios'
import { TGetReportsResponse } from './schemas'

export const getReports = async () => {
	const response = await axiosInstance.get('/reports')
	return response.data as TGetReportsResponse
}

