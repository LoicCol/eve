import { z } from "zod";

export interface Group {
  id: number;
  name: string;
  createdBy: string;
}

export const createEventFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  location: z.string().min(1, { message: "Required" }),
  group: z.string(),
  description: z.string().nullable().optional(),
  sectionId: z.string().nullable().optional(),
  startDate: z.string().min(1, { message: "Required" }),
  startTime: z.string().nullable().optional(),
  endDate: z.string().nullable().optional(),
  endTime: z.string().nullable().optional(),
});

export const editGroupFormSchema = createEventFormSchema.omit({
  group: true,
});

export type CreateEventFormFields = z.infer<typeof createEventFormSchema>;
export type EditEventFormFields = z.infer<typeof editGroupFormSchema>;

export const createGroupFormSchema = z.object({
  name: z.string(),
});

export type CreateGroupFormFields = z.infer<typeof createGroupFormSchema>;
