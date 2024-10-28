import { decode } from "@/util/shorten-uuid";
import { getEventsForGroup } from "@/features/events/server/events.queries";
import { serializeSections } from "@/util/serialize-sections";
import EditEventForm from "./edit-event-form";
import { notFound } from "next/navigation";

export default async function EditPage({
  params,
}: {
  params: { id: string; eventId: string };
}) {
  const { id, eventId } = params;
  const groupId = decode(id);
  const events = await getEventsForGroup(groupId);
  const sections = serializeSections(events);
  const event = events.find((event) => event.eventId === decode(eventId));

  if (!event) {
    return notFound();
  }

  const serializedEvent = {
    name: event.eventName,
    location: event.location,
    startDate: event.startDate.toISOString().substring(0, 10),
    startTime: event.startTime?.substring(0, 5),
    endDate: event.endDate?.toISOString().substring(0, 10),
    endTime: event.endTime?.substring(0, 5),
    description: event.description,
    sectionId: event.sectionId,
  };

  return <EditEventForm event={serializedEvent} sections={sections} />;
}
