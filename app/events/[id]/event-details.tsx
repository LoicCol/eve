"use server";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { events } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function EventDetails({ id }: { id: string }) {
  const idInt = parseInt(id);
  const result = await db.select().from(events).where(eq(events.id, idInt));

  if (result.length === 0 || !result[0]) {
    return <p>Event not found</p>;
  }

  const event = result[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Location: {event.location}</p>
        <p className="text-muted-foreground">
          Date: {new Date(event.dateTime).toLocaleString()}
        </p>
        <p className="text-muted-foreground">Created by: {event.createdBy}</p>
      </CardContent>
      <CardFooter>
        <Button>Join Event</Button>
      </CardFooter>
    </Card>
  );
}
