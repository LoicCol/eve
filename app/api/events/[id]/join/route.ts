import { NextResponse } from "next/server";
import { db } from "../../../../../db";
import { participants } from "../../../../../db/schema";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const eventId = parseInt(params.id);
  const userId = "user_id"; // Replace with actual user ID from Clerk

  try {
    await db.insert(participants).values({
      eventId,
      userId,
      isDJ: false,
    });
    return NextResponse.json({ message: "Joined event successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to join event" },
      { status: 500 }
    );
  }
}
