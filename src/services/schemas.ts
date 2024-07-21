import z from 'zod';

export const Reports = z.object({
	id: z.string(),
	reportType: z.string(),
	name: z.string(),
	webUrl: z.string(),
	embedUrl: z.string(),
	isOwnedByMe: z.boolean(),
	datasetId: z.string(),
	datasetWorkspaceId: z.string(),
	users: z.array(z.unknown()),
	subscriptions: z.array(z.unknown())
});

export const GetReportsResponse = z.object({
	value: z.array(Reports)
});

export type TGetReportsResponse = z.infer<typeof GetReportsResponse>;