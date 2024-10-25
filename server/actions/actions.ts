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
  checkUserGroup,
} from "server/queries";
import {
  CreateEventFormFields,
  createEventFormSchema,
  CreateGroupFormFields,
  createGroupFormSchema,
  EditEventFormFields,
  editGroupFormSchema,
} from "types";
import { encode } from "@/util/shorten-uuid";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentLocale } from "@/locales/server";

export async function getGroupName(groupId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const group = await getGroup(groupId);

  return group?.groupName;
}

export async function getEventName(eventId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const event = await getEvent(eventId);

  return event?.eventName;
}

export async function createEvent(formData: CreateEventFormFields) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const validationResult = createEventFormSchema.safeParse(formData);

  if (!validationResult.success) {
    throw {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, location, startDate, group } = validationResult.data;
  const locale = getCurrentLocale();

  const event = await insertEvent(
    name,
    location,
    startDate,
    group,
    user.userId,
  );

  revalidatePath(`/${locale}/events`);
  redirect(
    `/${locale}/groups/${encode(group)}/events/${encode(event?.eventId || "")}`,
  );
}

export async function createGroup(formData: CreateGroupFormFields) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const validationResult = createGroupFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name } = validationResult.data;
  const locale = getCurrentLocale();

  const group = await insertGroup(name, user.userId);

  if (group?.groupId) {
    await insertUserGroup(user.userId, group.groupId);
  }

  revalidatePath(`/${locale}/groups`);
  redirect(`/${locale}/groups/${encode(group?.groupId || "")}`);
}

export async function joinEvent(
  eventId: string,
  status: "participate" | "maybe",
) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await insertUserEvent(user.userId, eventId, status);

  revalidatePath(`/${locale}/events/${eventId}`);
}

export async function leaveEvent(eventId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await deleteUsersEvent(user.userId, eventId);

  revalidatePath(`/${locale}/events/${eventId}`);
}

export async function joinGroup(groupId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await insertUserGroup(user.userId, groupId);
  revalidatePath(`/${locale}/groups/${encode(groupId)}`);
}

export async function leaveGroup(groupId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await removeUserGroup(user.userId, groupId);
  revalidatePath(`/${locale}/groups/${encode(groupId)}`);
}

export async function editEvent(
  eventId: string,
  formData: EditEventFormFields,
) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const validationResult = editGroupFormSchema.safeParse(formData);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const {
    name: eventName,
    location,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
  } = validationResult.data;
  const locale = getCurrentLocale();

  const event = await updateEvent(eventId, {
    eventName,
    location,
    startDate: new Date(startDate),
    startTime: startTime || null,
    endDate: endDate ? new Date(endDate) : null,
    endTime: endTime || null,
    description: description || "",
  });

  revalidatePath(`/${locale}/groups/${event?.groupId}/events/${eventId}`);
  redirect(
    `/${locale}/groups/${encode(event?.groupId || "")}/events/${encode(
      eventId,
    )}`,
  );
}

export async function deleteEvent(eventId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await deleteEventQuery(eventId);

  revalidatePath(`/${locale}/groups`);
}

export async function editGroupName(groupId: string, groupName: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await editGroupQuery(groupId, {
    groupName,
  });

  revalidatePath(`/${locale}/groups/${groupId}`);
}

export async function editGroupDescription(
  groupId: string,
  description: string,
) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await editGroupQuery(groupId, {
    description,
  });

  revalidatePath(`/${locale}/groups/${groupId}`);
}

export async function deleteGroup(groupId: string) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

  await deleteGroupQuery(groupId);

  revalidatePath(`/${locale}/groups`);
}

export async function linkEventsToSection(
  eventIds: string[],
  sectionName?: string,
  sectionId?: string,
) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const locale = getCurrentLocale();

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

  revalidatePath(`/${locale}/events`);
}

export async function getCurrentUserGroups() {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const groups = await getUserGroups(user.userId);

  return groups.filter((group) => group?.groupId);
}

export async function getGroupEvents(
  groupId: string,
  filter: "upcoming" | "past",
) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const events = await getEventsForGroup(groupId, filter);

  return events;
}

export async function hasUserJoinedGroup() {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const isUserInGroup = await checkUserGroup(user.userId);

  return isUserInGroup;
}
