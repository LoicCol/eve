"use server";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { auth } from "@clerk/nextjs/server";

export async function getUser(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  return user;
}

export async function insertUser(
  userId: string,
  email: string,
  name: string,
  image: string,
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
  image: string,
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

export async function deleteUser(userId: string) {
  await db.delete(users).where(eq(users.userId, userId));
}

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
