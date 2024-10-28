"use server";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

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
