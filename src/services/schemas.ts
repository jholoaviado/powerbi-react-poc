import z from 'zod';

export const Report = z.object({
	id: z.string(),
	name: z.string(),
	embedUrl: z.string(),
});

export const Dashboard = z.object({
	id: z.string(),
	displayName: z.string(),
	embedUrl: z.string(),
});

export const GetReportsResponse = z.object({
	value: z.array(Report)
});

export const GetDashboardsResponse = z.object({
	value: z.array(Dashboard)
});


export type TGetReportsResponse = z.infer<typeof GetReportsResponse>;
export type TGetDashboardsResponse = z.infer<typeof GetDashboardsResponse>;