import { getI18n } from "@/locales/server";
import Modal from "@/components/modal";
import LinkEvents from "../link-events";
import { getEventsForGroup } from "@/server/queries";
import { decode } from "@/util/shorten-uuid";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = await getI18n();
  const events = await getEventsForGroup(decode(id));

  const serializedEvents = events.map((event) => ({
    eventId: event.eventId,
    eventName: event.eventName,
    sectionName: event.sectionName || t("linkEvents.otherSection"),
    sectionId: event.sectionId || "other",
  }));

  return (
    <Modal>
      <LinkEvents events={serializedEvents} />
    </Modal>
  );
}
