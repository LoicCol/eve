import LinkEvents from "@/features/events/components/link-events";
import { getEventsForGroup } from "@/features/events/server/queries/events";
import { decode } from "@/util/shorten-uuid";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const events = await getEventsForGroup(decode(id));

  const serializedEvents = events.map((event) => ({
    eventId: event.eventId,
    eventName: event.eventName,
    sectionName: event.sectionName || "Other",
    sectionId: event.sectionId || "other",
  }));

  return <LinkEvents events={serializedEvents} />;
}
