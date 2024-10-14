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
  deleteUsersEvent,
  deleteEvent as deleteEventQuery,
  editGroup as editGroupQuery,
  deleteGroup as deleteGroupQuery,
  createSection,
  linkEventsToSection as linkEventsToSectionQuery,
  getUserGroups,
  getSection,
  getEventsForGroup,
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
import { redirect } from "next/navigation";

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
    throw {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, location, date, group } = validationResult.data;

  const event = await insertEvent(name, location, date, group, user.userId);

  revalidatePath("/events");
  redirect(`/groups/${encode(group)}/events/${encode(event?.eventId || "")}`);
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

  const group = await insertGroup(name, user.userId);

  revalidatePath("/groups");
  redirect(`/groups/${encode(group?.groupId || "")}`);
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

export async function leaveEvent(eventId: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await deleteUsersEvent(user.userId, eventId);

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

  const validationResult = createEventFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const {
    name: eventName,
    location,
    date,
    group,
    description,
  } = validationResult.data;

  await updateEvent(eventId, {
    eventName,
    location,
    eventDate: new Date(date),
    groupId: group,
    description: description || "",
  });

  revalidatePath(`/groups/${group}/events/${eventId}`);
}

export async function deleteEvent(eventId: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await deleteEventQuery(eventId);

  revalidatePath("/events");
}

export async function editGroupName(groupId: string, groupName: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await editGroupQuery(groupId, {
    groupName,
  });

  revalidatePath(`/groups/${groupId}`);
}

export async function editGroupDescription(
  groupId: string,
  description: string,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await editGroupQuery(groupId, {
    description,
  });

  revalidatePath(`/groups/${groupId}`);
}

export async function deleteGroup(groupId: string) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await deleteGroupQuery(groupId);

  revalidatePath("/groups");
}

export async function linkEventsToSection(
  eventIds: string[],
  sectionName?: string,
  sectionId?: string,
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  let section;

  if (sectionId) {
    section = await getSection(sectionId);
    if (!section) {
      throw new Error("Section not found");
    }
  } else if (sectionName) {
    section = await createSection(sectionName, "");
    if (!section) {
      throw new Error("Failed to create section");
    }
  } else {
    throw new Error("Either sectionName or sectionId must be provided");
  }

  await linkEventsToSectionQuery(eventIds, section.sectionId);

  revalidatePath("/events");
}

export async function getCurrentUserGroups() {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const groups = await getUserGroups(user.userId);

  return groups.filter((group) => group?.groupId);
}

export async function getGroupEvents(
  groupId: string,
  filter: "upcoming" | "past",
) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const events = await getEventsForGroup(groupId);

  return events;
}
