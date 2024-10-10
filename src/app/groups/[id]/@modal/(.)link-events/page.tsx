import Modal from "@/components/modal";
import LinkEvents from "../../_components/link-events";
import { getEvents } from "@/server/queries";

export default async function Page() {
  const events = await getEvents();
  return (
    <Modal>
      <LinkEvents events={events} />
    </Modal>
  );
}
