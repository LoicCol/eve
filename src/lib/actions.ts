"use server";

import { insertEvent, insertGroup } from "@/server/queries";
import {
  CreateEventFormFields,
  createEventFormSchema,
  CreateGroupFormFields,
  createGroupFormSchema,
} from "@/types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: CreateEventFormFields) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const validationResult = createEventFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, location, date, group } = validationResult.data;

  await insertEvent(name, location, date, group, user.userId);

  revalidatePath("/events");
}

export async function createGroup(formData: CreateGroupFormFields) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const validationResult = createGroupFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name } = validationResult.data;

  await insertGroup(name, user.userId);

  revalidatePath("/groups");
}
