import { db } from "@/server/db";
import { events, groups, users } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

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
