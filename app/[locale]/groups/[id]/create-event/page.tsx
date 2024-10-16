import Modal from "@/src/components/modal";
import CreateEventForm from "../_components/create-event-form";
import { decode } from "@/src/util/shorten-uuid";
import { getEventsForGroup } from "@/src/server/queries";

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

  return (
    <Modal>
      <CreateEventForm sections={sections} />
    </Modal>
  );
}
