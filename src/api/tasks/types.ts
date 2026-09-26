import { z } from 'zod';

export const tasksSummarySchema = z.object({
  overdueCount: z.number(),
  pendingManualCount: z.number(),
  pendingAutoCount: z.number(),
  pendingAutoErrorCount: z.number(),
  completedCount: z.number(),
});

export type TasksSummary = z.infer<typeof tasksSummarySchema>;
