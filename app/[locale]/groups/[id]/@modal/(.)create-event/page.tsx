import CreateEventForm from "../../create-event/create-event-form";
import { decode } from "@/util/shorten-uuid";
import { getEventsForGroup } from "server/queries";

export default async function Page({ params }: { params: { id: string } }) {
  const events = await getEventsForGroup(decode(params.id));

  const sections = events.reduce(
    (acc, event) => {
      if (!event.sectionId || !event.sectionName) return acc;

      if (!acc.some((section) => section.sectionId === event.sectionId)) {
        acc.push({
          sectionId: event.sectionId,
          sectionName: event.sectionName,
        });
      }
      return acc;
    },
    [] as { sectionId: string; sectionName: string }[],
  );

  return <CreateEventForm sections={sections} />;
}
