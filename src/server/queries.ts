import { eq } from "drizzle-orm";
import { db } from "./db";
import { events, groups, users } from "./db/schema";

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.userId, userId),
  });

  return user;
}

export async function insertUser(
  userId: string,
  email: string,
  name: string,
  image: string
) {
  await db.insert(users).values({
    userId,
    email,
    name,
    image,
  });
}

export async function updateUser(
  userId: string,
  email: string,
  name: string,
  image: string
) {
  await db
    .update(users)
    .set({
      email,
      name,
      image,
    })
    .where(eq(users.userId, userId));
}

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

export async function getEventsForGroup(groupId: string) {
  const events = await db.query.events.findMany({
    where: (model, { eq }) => eq(model.groupId, groupId),
  });

  return events;
}

export async function insertEvent(
  eventName: string,
  location: string,
  eventDate: string,
  groupId: string,
  createdBy: string
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

export async function insertGroup(groupName: string, createdBy: string) {
  await db.insert(groups).values({
    groupName,
    createdBy,
    createdAt: new Date(),
  });
}
