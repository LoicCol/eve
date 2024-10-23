import { z } from "zod";

export interface Group {
  id: number;
  name: string;
  createdBy: string;
}

export const createEventFormSchema = z.object({
  name: z.string(),
  location: z.string(),
  group: z.string(),
  description: z.string().nullable().optional(),
  sectionId: z.string().nullable().optional(),
  startDate: z.string(),
  startTime: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
});

export type CreateEventFormFields = z.infer<typeof createEventFormSchema>;

export const createGroupFormSchema = z.object({
  name: z.string(),
});

export type CreateGroupFormFields = z.infer<typeof createGroupFormSchema>;
