import Modal from "@/components/modal";
import CreateEventForm from "../../_components/create-event-form";

export default async function Page() {
  return (
    <Modal>
      <CreateEventForm />
    </Modal>
  );
}
