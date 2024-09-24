import { NextResponse } from "next/server";
import { db } from "../../../../db";
import { events } from "../../../../db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const result = await db.select().from(events).where(eq(events.id, id));
  if (result.length === 0) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  return NextResponse.json(result[0]);
}
