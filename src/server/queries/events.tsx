"use server";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { events, userEvents } from "../db/schema";

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
  await db.insert(events).values({
    eventName,
    location,
    eventDate: new Date(eventDate),
    createdBy,
    createdAt: new Date(),
    groupId,
  });
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
  },
) {
  await db.update(events).set(data).where(eq(events.eventId, eventId));
}
