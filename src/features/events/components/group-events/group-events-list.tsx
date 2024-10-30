import { AnimatedGroup } from "@/components/motioned/animated-group";
import EventCard from "../event-card/event-card";
import { encode } from "@/util/shorten-uuid";
import Link from "next/link";

type Event = {
  eventId: string;
  eventName: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  startTime: string | null;
  endTime: string | null;
  sectionName: string | null;
  sectionId: string | null;
};

export default function EventsList({
  events,
  groupId,
  display,
}: {
  events: Event[];
  groupId: string;
  display: "grouped" | "sorted";
}) {
  if (display === "grouped") {
    return <EventListGrouped events={events} groupId={groupId} />;
  }

  return <EventListSorted events={events} groupId={groupId} />;
}

function EventListGrouped({
  events,
  groupId,
}: {
  events: Event[];
  groupId: string;
}) {
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

  let sortedSections = Object.keys(groupedEvents);

  if (sortedSections.includes("other")) {
    sortedSections = sortedSections.filter((section) => section !== "other");
    sortedSections.push("other");
  }

  return sortedSections.map((sectionId) => (
    <div key={sectionId}>
      <h2 className="mb-4 font-sans text-xl font-bold delay-100 animate-in">
        {sectionId === "other"
          ? "-"
          : groupedEvents[sectionId]?.[0]?.sectionName}
      </h2>
      <AnimatedGroup className="grid gap-4 md:grid-cols-2" preset="blur">
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
  ));
}

function EventListSorted({
  events,
  groupId,
}: {
  events: Event[];
  groupId: string;
}) {
  return (
    <AnimatedGroup className="grid gap-4 md:grid-cols-2" preset="blur">
      {events.map((event) => (
        <Link
          href={`/groups/${encode(groupId)}/events/${encode(event.eventId)}`}
          key={event.eventId}
        >
          <EventCard event={event} />
        </Link>
      ))}
    </AnimatedGroup>
  );
}
