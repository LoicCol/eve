"use server";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "../db";
import { events, eventSections, userEvents } from "../db/schema";

export async function getEvents() {
  const events = await db.query.events.findMany();

  return events;
}

export async function getEvent(eventId: string) {
  const event = await db.query.events.findFirst({
    where: eq(events.eventId, eventId),
  });

  return event;
}

export async function getEventsForGroup(groupId: string) {
  const eventsRes = await db.query.events.findMany({
    where: eq(events.groupId, groupId),
  });

  return eventsRes;
}

export async function insertEvent(
  eventName: string,
  location: string,
  eventDate: string,
  groupId: string,
  createdBy: string,
) {
  const event = await db
    .insert(events)
    .values({
      eventName,
      location,
      eventDate: new Date(eventDate),
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
    eventDate: Date;
    groupId: string;
    description: string;
  },
) {
  await db.update(events).set(data).where(eq(events.eventId, eventId));
}

export async function deleteEvent(eventId: string) {
  await db.delete(events).where(eq(events.eventId, eventId));
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
