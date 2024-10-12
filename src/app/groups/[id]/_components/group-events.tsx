import { getEventsForGroup } from "@/server/queries";
import EventCard from "@/components/event-card";
import Link from "next/link";
import { encode } from "@/util/shorten-uuid";
import { AnimatedGroup } from "@/components/animated-group";

export default async function GroupEvents({ groupId }: { groupId: string }) {
  const events = await getEventsForGroup(groupId);

  const groupedEvents = events.reduce(
    (acc, event) => {
      const sectionId = event.sectionId || "other";
      if (!acc[sectionId]) {
        acc[sectionId] = [];
      }
      acc[sectionId].push(event);
      return acc;
    },
    {} as { [key: string]: typeof events },
  );

  let sortedSections = Object.keys(groupedEvents).sort();

  // Move "other" section to the end if it exists
  if (sortedSections.includes("other")) {
    sortedSections = sortedSections.filter((section) => section !== "other");
    sortedSections.push("other");
  }

  return events.length > 0 ? (
    <div className="space-y-8 overflow-auto pt-2 md:p-2">
      {sortedSections.map((sectionId) => (
        <div key={sectionId}>
          <h2 className="mb-4 text-xl font-bold delay-100 animate-in">
            {sectionId === "other"
              ? "Other"
              : groupedEvents[sectionId]?.[0]?.sectionName}
          </h2>
          <AnimatedGroup
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            preset="blur"
          >
            {groupedEvents[sectionId]?.map((event) => (
              <Link
                href={`/groups/${encode(groupId)}/events/${encode(event.eventId)}`}
                key={event.eventId}
              >
                <EventCard event={event} />
              </Link>
            ))}
          </AnimatedGroup>
        </div>
      ))}
    </div>
  ) : (
    <p className="p-2 px-6 italic text-muted-foreground">No events found</p>
  );
}
