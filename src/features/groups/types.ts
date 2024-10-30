import { z } from "zod";

export interface Group {
  id: number;
  name: string;
  createdBy: string;
}

export const createGroupFormSchema = z.object({
  name: z.string(),
});

export type CreateGroupFormFields = z.infer<typeof createGroupFormSchema>;
