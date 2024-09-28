import { getEventsForGroup } from "@/server/queries";
import EventCard from "@/components/event-card";
import Link from "next/link";
import { encode } from "@/util/shorten-uuid";

export default async function GroupEvents({ groupId }: { groupId: string }) {
  const events = await getEventsForGroup(groupId);

  return events.length > 0 ? (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Link
          href={`/groups/${encode(groupId)}/events/${encode(event.eventId)}`}
          key={event.eventId}
        >
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  ) : (
    <p>No events found</p>
  );
}