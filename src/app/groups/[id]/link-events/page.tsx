import Modal from "@/components/modal";
import LinkEvents from "../_components/link-events";
import { getEventsForGroup } from "@/server/queries";
import { decode } from "@/util/shorten-uuid";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  const events = await getEventsForGroup(decode(id));
  return (
    <Modal>
      <LinkEvents events={events} />
    </Modal>
  );
}
