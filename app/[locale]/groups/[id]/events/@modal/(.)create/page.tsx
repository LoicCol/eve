import CreateEventForm from "@/features/events/components/create-event-form";
import { getEventsForGroup } from "@/features/events/server/queries/events";
import { serializeSections } from "@/util/serialize-sections";
import { decode } from "@/util/shorten-uuid";

export default async function Page({ params }: { params: { id: string } }) {
  const events = await getEventsForGroup(decode(params.id));

  const sections = serializeSections(events);

  return <CreateEventForm sections={sections} />;
}
