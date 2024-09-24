import { db } from "./db";
import { events, groups } from "./db/schema";

export async function getEvents() {
  const events = await db.query.events.findMany();

  return events;
}

export async function getEvent(eventId: string) {
  const event = await db.query.events.findFirst({
    where: (model, { eq }) => eq(model.eventId, eventId),
  });

  return event;
}

export async function insertEvent(
  eventName: string,
  location: string,
  eventDate: string
) {
  await db.insert(events).values({
    eventName,
    location,
    eventDate: new Date(eventDate),
    createdBy: "user-id",
    createdAt: new Date(),
  });
}

export async function getGroups() {
  const groups = await db.query.groups.findMany();

  return groups;
}

export async function getGroup(groupId: string) {
  const group = await db.query.groups.findFirst({
    where: (model, { eq }) => eq(model.groupId, groupId),
  });

  return group;
}

export async function insertGroup(groupName: string) {
  await db.insert(groups).values({
    groupName,
    createdBy: "user-id",
    createdAt: new Date(),
  });
}
