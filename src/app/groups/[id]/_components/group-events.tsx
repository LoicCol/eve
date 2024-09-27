import { getEventsForGroup } from "@/server/queries";
import EventCard from "@/components/event-card";
import { Calendar, Group } from "lucide-react";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { encode } from "@/util/shorten-uuid";

export default async function GroupEvents({ groupId }: { groupId: string }) {
  console.log(groupId);
  const events = await getEventsForGroup(groupId);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Events</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Group className="mr-2 h-4 w-4" /> Link Events
          </Button>
          <Button asChild>
            <Link href={`/groups/${encode(groupId)}/create-event`}>
              <Calendar className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      </div>

      {events.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard event={event} key={event.eventId} />
          ))}
        </div>
      ) : (
        <p>No events found</p>
      )}
    </>
  );
}
