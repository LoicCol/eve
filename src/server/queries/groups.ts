"use server";
import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { groups, userGroups } from "../db/schema";

export async function getGroups() {
  const groups = await db.query.groups.findMany();

  return groups;
}

export async function getGroup(groupId: string) {
  const group = await db.query.groups.findFirst({
    where: eq(groups.groupId, groupId),
  });

  return group;
}

export async function getMembers(groupId: string) {
  const members = await db.query.userGroups.findMany({
    where: eq(groups.groupId, groupId),
    with: {
      user: true,
    },
  });

  return members.map((member) => member.user);
}

export async function insertGroup(groupName: string, createdBy: string) {
  const result = await db
    .insert(groups)
    .values({
      groupName,
      createdBy,
      createdAt: new Date(),
    })
    .returning({ groupId: groups.groupId });

  return result[0];
}

export async function insertUserGroup(userId: string, groupId: string) {
  await db.insert(userGroups).values({
    userId,
    groupId,
    joinedAt: new Date(),
  });
}

export async function removeUserGroup(userId: string, groupId: string) {
  await db
    .delete(userGroups)
    .where(and(eq(userGroups.userId, userId), eq(userGroups.groupId, groupId)));
}

export async function editGroup(
  groupId: string,
  data: { groupName?: string; description?: string },
) {
  await db.update(groups).set(data).where(eq(groups.groupId, groupId));
}

export async function deleteGroup(groupId: string) {
  await db.delete(groups).where(eq(groups.groupId, groupId));
}
