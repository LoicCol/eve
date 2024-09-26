"use server";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getEvent, getUser } from "@/server/queries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function EventDetails({ id }: { id: string }) {
  const event = await getEvent(id);

  if (!event) {
    return <p>Event not found</p>;
  }

  const user = await getUser(event.createdBy);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.eventName}</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col">
        <p className="text-muted-foreground">Location: {event.location}</p>
        <p className="text-muted-foreground">
          Date: {new Date(event.eventDate).toLocaleString()}
        </p>
        {event.description ? (
          <p>{event.description}</p>
        ) : (
          <i className="text-muted-foreground">No description</i>
        )}
        <div className="flex items-center">
          <p className="text-muted-foreground pr-2">Created by: {user?.name}</p>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
      <CardFooter>
        <Button>Join Event</Button>
      </CardFooter>
    </Card>
  );
}
