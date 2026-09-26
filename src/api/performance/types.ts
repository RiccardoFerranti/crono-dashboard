import { z } from 'zod';

export const performanceKpiTypeSchema = z.enum([
  'contacts-engaged',
  'companies-engaged',
  'activities',
  'meetings',
  'deals',
  'pipeline',
]);

export const performanceKpiSchema = z.object({
  id: z.string(),
  type: performanceKpiTypeSchema,
  label: z.string(),
  current: z.number(),
  target: z.number(),
});

export const performanceKpisResponseSchema = z.array(performanceKpiSchema);

export type PerformanceKpiType = z.infer<typeof performanceKpiTypeSchema>;
export type PerformanceKpi = z.infer<typeof performanceKpiSchema>;
