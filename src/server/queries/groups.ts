import { eq } from "drizzle-orm";
import { db } from "../db";
import { groups } from "../db/schema";

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

export async function insertGroup(groupName: string, createdBy: string) {
  await db.insert(groups).values({
    groupName,
    createdBy,
    createdAt: new Date(),
  });
}
