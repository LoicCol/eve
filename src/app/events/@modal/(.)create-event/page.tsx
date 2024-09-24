import Modal from "@/components/modal";
import CreateEventForm from "../../_components/create-event-form";
import { getGroups } from "@/server/queries";

export default async function Page() {
  const groups = await getGroups();

  return (
    <Modal>
      <CreateEventForm groups={groups} />
    </Modal>
  );
}
