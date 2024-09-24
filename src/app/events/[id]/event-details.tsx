"use server";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from "@/server/db";

export default async function EventDetails({ id }: { id: string }) {
  const event = await db.query.events.findFirst({
    where: (model, { eq }) => eq(model.eventId, id),
  });

  if (!event) {
    return <p>Event not found</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.eventName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Location: {event.location}</p>
        <p className="text-muted-foreground">
          Date: {new Date(event.eventDate).toLocaleString()}
        </p>
        <p className="text-muted-foreground">Created by: {event.createdBy}</p>
      </CardContent>
      <CardFooter>
        <Button>Join Event</Button>
      </CardFooter>
    </Card>
  );
}
