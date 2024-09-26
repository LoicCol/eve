"use server";

import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGroup, getEventsForGroup, getUser } from "@/server/queries";

export default async function GroupDetails({ id }: { id: string }) {
  const group = await getGroup(id);
  const events = await getEventsForGroup(id);

  if (!group) {
    return <div>Not found</div>;
  }

  const user = await getUser(group.createdBy);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{group.groupName}</CardTitle>
        </CardHeader>
        <CardContent className="gap-4 flex flex-col">
          {group.description ? (
            <p className="text-muted-foreground">{group.description}</p>
          ) : (
            <i className="text-muted-foreground">No description</i>
          )}
          <div className="flex items-center">
            <p className="text-muted-foreground pr-2">
              Created by: {user?.name}
            </p>
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <h2 className="text-xl font-bold mt-4 mb-4">Events</h2>
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard event={event} key={event.eventId} />
            ))
          ) : (
            <p>No events found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
