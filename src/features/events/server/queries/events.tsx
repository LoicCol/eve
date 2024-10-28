"use server";
import { and, eq, gte, inArray, lt } from "drizzle-orm";
import { db } from "@/server/db";
import {
  events,
  eventSections,
  userEvents,
  userGroups,
} from "@/server/db/schema";

export async function getEvents(userId: string) {
  const groups = await db.query.userGroups.findMany({
    where: eq(userGroups.userId, userId),
  });

  const groupIds = groups
    .map((group) => group.groupId)
    .filter((id) => id !== null);

  const evts = await db.query.events.findMany({
    where: inArray(events.groupId, groupIds),
    orderBy: (events, { asc }) => [asc(events.startDate)],
  });

  return evts;
}

export async function getEvent(eventId: string) {
  const event = await db.query.events.findFirst({
    where: eq(events.eventId, eventId),
  });

  return event;
}

export async function getEventsForGroup(
  groupId: string,
  dateFilter: "upcoming" | "past" = "upcoming",
) {
  const now = new Date();
  const eventsRes = await db
    .select({
      eventId: events.eventId,
      eventName: events.eventName,
      description: events.description,
      location: events.location,
      startDate: events.startDate,
      startTime: events.startTime,
      endDate: events.endDate,
      endTime: events.endTime,
      createdAt: events.createdAt,
      createdBy: events.createdBy,
      sectionId: events.sectionId,
      groupId: events.groupId,
      sectionName: eventSections.name,
    })
    .from(events)
    .leftJoin(eventSections, eq(events.sectionId, eventSections.sectionId))
    .where(
      and(
        eq(events.groupId, groupId),
        dateFilter === "upcoming"
          ? gte(events.startDate, now)
          : lt(events.startDate, now),
      ),
    )
    .orderBy(events.startDate);

  return eventsRes;
}

export async function insertEvent({
  eventName,
  location,
  startDate,
  groupId,
  createdBy,
  endDate,
  startTime,
  endTime,
}: {
  eventName: string;
  location: string;
  startDate: string;
  groupId: string;
  createdBy: string;
  endDate?: string | null;
  startTime?: string | null;
  endTime?: string | null;
}) {
  const event = await db
    .insert(events)
    .values({
      eventName,
      location,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      startTime,
      endTime,
      createdBy,
      createdAt: new Date(),
      groupId,
    })
    .returning({ eventId: events.eventId });

  return event[0];
}

export async function insertUserEvent(
  userId: string,
  eventId: string,
  status: "participate" | "maybe",
) {
  await db
    .insert(userEvents)
    .values({
      userId,
      eventId,
      joinedAt: new Date(),
      status,
    })
    .onConflictDoUpdate({
      target: [userEvents.userId, userEvents.eventId],
      set: {
        status,
        joinedAt: new Date(),
      },
    });
}

export async function deleteUsersEvent(userId: string, eventId: string) {
  await db
    .delete(userEvents)
    .where(and(eq(userEvents.userId, userId), eq(userEvents.eventId, eventId)));
}

export async function getParticipants(eventId: string) {
  const participants = await db.query.userEvents.findMany({
    where: eq(userEvents.eventId, eventId),
    with: {
      user: true,
    },
  });

  return participants;
}

export async function updateEvent(
  eventId: string,
  data: {
    eventName: string;
    location: string;
    startDate: Date;
    startTime: string | null;
    endDate: Date | null;
    endTime: string | null;
    description: string;
  },
) {
  const event = await db
    .update(events)
    .set(data)
    .where(eq(events.eventId, eventId))
    .returning({ eventId: events.eventId, groupId: events.groupId });

  return event[0];
}

export async function deleteEvent(eventId: string) {
  const event = await db.delete(events).where(eq(events.eventId, eventId));

  return event;
}

export async function createSection(name: string, description: string) {
  const section = await db
    .insert(eventSections)
    .values({
      name,
      description,
    })
    .returning({ sectionId: eventSections.sectionId });

  return section[0];
}

export async function linkEventsToSection(
  eventIds: string[],
  sectionId: string,
) {
  await db
    .update(events)
    .set({ sectionId })
    .where(inArray(events.eventId, eventIds));
}

export async function getSection(sectionId: string) {
  const section = await db.query.eventSections.findFirst({
    where: eq(eventSections.sectionId, sectionId),
  });

  return section;
}
