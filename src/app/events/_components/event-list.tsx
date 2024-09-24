"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getEvents } from "@/server/queries";
import Link from "next/link";

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
            <Link href={`/events/${event.eventId}`} key={event.eventId}>
              <Card
                key={event.eventId}
                className="transition-shadow ease-in-out duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <CardTitle>{event.eventName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.eventDate).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
