"use server";

import EventCard from "@/src/components/event-card";
import { getEvents } from "@/src/server/queries";
import { auth } from "@clerk/nextjs/server";

export default async function EventList() {
  const { userId } = auth();
  const events = await getEvents(userId || "");

  return (
    <div className="mt-4">
      {events.length === 0 ? (
        <p className="text-muted-foreground">No events found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard event={event} key={event.eventId} />
          ))}
        </div>
      )}
    </div>
  );
}
