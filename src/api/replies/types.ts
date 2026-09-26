import { z } from 'zod';

export const repliesSummarySchema = z.object({
  unreadCount: z.number(),
});

export type RepliesSummary = z.infer<typeof repliesSummarySchema>;
