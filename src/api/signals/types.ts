import { z } from 'zod';

export const signalCategorySchema = z.enum(['role-change', 'company-change', 'website-view']);

export const signalMessagePartSchema = z.object({
  text: z.string(),
  emphasis: z.enum(['strong', 'accent']).optional(),
});

export const signalSchema = z.object({
  id: z.string(),
  category: signalCategorySchema,
  inSequence: z.boolean(),
  message: z.array(signalMessagePartSchema),
  date: z.string(),
  image: z.object({
    src: z.string(),
    alt: z.string(),
  }),
});

export const signalsResponseSchema = z.array(signalSchema);

export type SignalCategory = z.infer<typeof signalCategorySchema>;
export type SignalMessagePart = z.infer<typeof signalMessagePartSchema>;
export type Signal = z.infer<typeof signalSchema>;
