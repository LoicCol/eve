"use server";

import { getEventName, getGroupName } from "./header.queries";

export async function getEventNameAction(eventId: string) {
  const eventName = await getEventName(eventId);
  return eventName;
}

export async function getGroupNameAction(groupId: string) {
  const groupName = await getGroupName(groupId);
  return groupName;
}
