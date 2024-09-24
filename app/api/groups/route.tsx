import { NextResponse } from "next/server";
import { db } from "../../../db";
import { groups } from "../../../db/schema";

export async function GET() {
  const result = await db.select().from(groups);
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  const { name } = await request.json();
  const result = await db.insert(groups).values({
    name,
    createdBy: "user_id", // Replace with actual user ID from Clerk
  });
  return NextResponse.json(result);
}
