"use server";

import EventCard from "@/components/event-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGroup, getEventsForGroup } from "@/server/queries";

export default async function GroupDetails({ id }: { id: string }) {
  const group = await getGroup(id);
  const events = await getEventsForGroup(id);

  if (!group) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{group.groupName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{group.description}</p>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-bold mt-8 mb-4">Events</h2>
      {events.length > 0 ? (
        events.map((event) => <EventCard event={event} key={event.eventId} />)
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
}
