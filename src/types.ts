import { z } from "zod";

export interface Group {
  id: number;
  name: string;
  createdBy: string;
}

export const createEventFormSchema = z.object({
  name: z.string(),
  location: z.string(),
  date: z.string(),
});

export type CreateEventFormFields = z.infer<typeof createEventFormSchema>;
