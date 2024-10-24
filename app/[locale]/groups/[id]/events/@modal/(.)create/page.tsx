import { serializeSections } from "@/util/serialize-sections";
import CreateEventForm from "../../create/create-event-form";
import { decode } from "@/util/shorten-uuid";
import { getEventsForGroup } from "server/queries";

export default async function Page({ params }: { params: { id: string } }) {
  const events = await getEventsForGroup(decode(params.id));

  const sections = serializeSections(events);

  return <CreateEventForm sections={sections} />;
}
