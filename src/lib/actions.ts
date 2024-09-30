"use server";

import {
  insertEvent,
  insertGroup,
  insertUserEvent,
  insertUserGroup,
  removeUserGroup,
  getGroup,
  getEvent,
  updateEvent,
} from "@/server/queries";
import {
  CreateEventFormFields,
  createEventFormSchema,
  CreateGroupFormFields,
  createGroupFormSchema,
} from "@/types";
import { encode } from "@/util/shorten-uuid";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getGroupName(groupId: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const group = await getGroup(groupId);

  return group?.groupName;
}

export async function getEventName(eventId: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const event = await getEvent(eventId);

  return event?.eventName;
}

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

export async function joinEvent(
  eventId: string,
  status: "participate" | "maybe",
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await insertUserEvent(user.userId, eventId, status);

  revalidatePath(`/events/${eventId}`);
}

export async function joinGroup(groupId: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  await insertUserGroup(user.userId, groupId);
  revalidatePath(`/groups/${encode(groupId)}`);
}

export async function leaveGroup(groupId: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");
  await removeUserGroup(user.userId, groupId);
  revalidatePath(`/groups/${encode(groupId)}`);
}

export async function editEvent(
  eventId: string,
  formData: CreateEventFormFields,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const validationResult = createEventFormSchema.partial().safeParse(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, location, date, group } = validationResult.data;

  await updateEvent(eventId, {
    name,
    location,
    date,
    group,
  });

  revalidatePath(`/events/${eventId}`);
}
