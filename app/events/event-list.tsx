"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { db } from "@/db";
import { events } from "@/db/schema";
import Link from "next/link";

export default async function EventList() {
  const eventsData = await db.select().from(events);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      {eventsData.length === 0 ? (
        <p className="text-muted-foreground">No events found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {eventsData.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <Card
                key={event.id}
                className="transition-shadow ease-in-out duration-300 hover:shadow-xl"
              >
                <CardHeader>
                  <CardTitle>{event.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {event.location}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(event.dateTime).toLocaleString()}
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
