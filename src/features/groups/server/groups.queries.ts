"use server";
import { and, eq } from "drizzle-orm";
import { db } from "@/server/db";
import { groups, userGroups } from "@/server/db/schema";

export async function getUserGroups(userId: string) {
  const groups = await db.query.userGroups.findMany({
    where: eq(userGroups.userId, userId),
    with: {
      group: true,
    },
    orderBy: (userGroups, { desc }) => [desc(userGroups.joinedAt)],
  });

  return groups
    .map((group) => group.group)
    .filter((group): group is NonNullable<typeof group> => group !== null);
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

  return members.map(
    (member) => member.user as NonNullable<typeof member.user>,
  );
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
