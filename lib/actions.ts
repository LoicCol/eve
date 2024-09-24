"use server";

import { db } from "@/db";
import { events } from "@/db/schema";
import { CreateEventFormFields, createEventFormSchema } from "@/app/types";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: CreateEventFormFields) {
  const { name, location, dateTime } = createEventFormSchema.parse(formData);

  await db.insert(events).values({
    name,
    location,
    dateTime: new Date(dateTime),
    createdBy: "user_id", // Replace with actual user ID from Clerk
  });

  revalidatePath("/events");
}
