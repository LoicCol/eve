import { auth } from "@clerk/nextjs/server";
import {
  createSection,
  deleteUsersEvent,
  getEvent,
  getEventsForGroup,
  getSection,
  insertEvent,
  insertUserEvent,
  updateEvent,
  deleteEvent as deleteEventQuery,
} from "./events.queries";
import {
  CreateEventFormFields,
  createEventFormSchema,
  EditEventFormFields,
  editEventFormSchema,
} from "../types";
import { getCurrentLocale } from "@/locales/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { encode } from "@/util/shorten-uuid";

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

  const { name, location, startDate, endDate, startTime, endTime, group } =
    validationResult.data;
  const locale = getCurrentLocale();

  const event = await insertEvent({
    eventName: name,
    location,
    startDate,
    groupId: group,
    createdBy: user.userId,
    endDate,
    startTime,
    endTime,
  });

  revalidatePath(`/${locale}/events`);
  redirect(
    `/${locale}/groups/${encode(group)}/events/${encode(event?.eventId || "")}`,
  );
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

export async function editEvent(
  eventId: string,
  formData: EditEventFormFields,
) {
  const user = auth();
  if (!user.userId) {
    auth().protect();
    throw new Error("Unauthorized");
  }

  const validationResult = editEventFormSchema.safeParse(formData);

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

  revalidatePath(
    `/${locale}/groups/${event?.groupId}/events/${encode(eventId)}`,
  );
  redirect(
    `/${locale}/groups/${encode(event?.groupId || "")}/events/${encode(
      eventId,
    )}`,
  );
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

  await linkEventsToSection(eventIds, section.sectionId);

  revalidatePath(`/${locale}/events`);
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
