"use server";

import { insertEvent, insertGroup } from "@/server/queries";
import {
  CreateEventFormFields,
  createEventFormSchema,
  CreateGroupFormFields,
  createGroupFormSchema,
} from "@/types";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: CreateEventFormFields) {
  const { name, location, date, group } = createEventFormSchema.parse(formData);

  console.log("Creating event", name, location, date, group);

  await insertEvent(name, location, date, group);

  revalidatePath("/events");
}

export async function createGroup(formData: CreateGroupFormFields) {
  const { name } = createGroupFormSchema.parse(formData);

  await insertGroup(name);

  revalidatePath("/groups");
}
