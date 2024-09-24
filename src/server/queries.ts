import { db } from "./db";

export async function getEvents() {
  const events = await db.query.events.findMany();

  return events;
}
