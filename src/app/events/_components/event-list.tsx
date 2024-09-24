"use server";

import EventCard from "@/components/event-card";
import { getEvents } from "@/server/queries";

export default async function EventList() {
  const events = await getEvents();

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
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
