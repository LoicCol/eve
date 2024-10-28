import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { events, groups, userGroups } from "./db/schema";
import { users } from "./db/schema";

export async function getCurrentUser() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  return user;
}

export async function checkUserGroup(userId: string) {
  const user = await db.query.userGroups.findFirst({
    where: eq(userGroups.userId, userId),
  });

  return user;
}

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  return user;
}

export async function getEventName(eventId: string) {
  const event = await db.query.events.findFirst({
    where: eq(events.eventId, eventId),
  });

  return event?.eventName;
}

export async function getGroupName(groupId: string) {
  const group = await db.query.groups.findFirst({
    where: eq(groups.groupId, groupId),
  });

  return group?.groupName;
}
