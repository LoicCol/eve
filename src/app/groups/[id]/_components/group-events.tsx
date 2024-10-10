import { getEventsForGroup } from "@/server/queries";
import EventCard from "@/components/event-card";
import Link from "next/link";
import { encode } from "@/util/shorten-uuid";

export default async function GroupEvents({ groupId }: { groupId: string }) {
  const events = await getEventsForGroup(groupId);

  const groupedEvents = events.reduce(
    (acc, event) => {
      const sectionName = event.sectionName || "Other";
      if (!acc[sectionName]) {
        acc[sectionName] = [];
      }
      acc[sectionName].push(event);
      return acc;
    },
    {} as { [key: string]: typeof events },
  );

  let sortedSections = Object.keys(groupedEvents).sort();

  // Move "Other" section to the end if it exists
  if (sortedSections.includes("Other")) {
    sortedSections = sortedSections.filter((section) => section !== "Other");
    sortedSections.push("Other");
  }

  return events.length > 0 ? (
    <div className="space-y-8 pt-2 md:p-2">
      {sortedSections.map((sectionName) => (
        <div key={sectionName}>
          <h2 className="mb-4 text-2xl font-bold">{sectionName}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupedEvents[sectionName]?.map((event) => (
              <Link
                href={`/groups/${encode(groupId)}/events/${encode(event.eventId)}`}
                key={event.eventId}
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="p-2 px-6 italic text-muted-foreground">No events found</p>
  );
}
