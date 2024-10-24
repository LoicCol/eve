import { serializeSections } from "@/util/serialize-sections";
import { decode } from "@/util/shorten-uuid";
import { getEventsForGroup } from "server/queries";
import EditEventForm from "../../../[eventId]/edit/edit-event-form";

export default async function Page({ params }: { params: { id: string } }) {
  const events = await getEventsForGroup(decode(params.id));
  const sections = serializeSections(events);

  console.log("coucou");

  return <EditEventForm sections={sections} />;
}
