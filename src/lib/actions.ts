"use server";

import { db } from "@/server/db";
import { events } from "@/server/db/schema";
import { CreateEventFormFields, createEventFormSchema } from "@/types";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: CreateEventFormFields) {
  const { name, location, date } = createEventFormSchema.parse(formData);

  await db.insert(events).values({
    eventName: name,
    location,
    eventDate: new Date(date),
    createdBy: "user-id",
    createdAt: new Date(),
  });

  revalidatePath("/events");
}
