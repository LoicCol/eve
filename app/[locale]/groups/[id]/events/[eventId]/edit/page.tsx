import { decode } from "@/util/shorten-uuid";
import { getEventsForGroup } from "server/queries";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getI18n } from "@/locales/server";
import { serializeSections } from "@/util/serialize-sections";
import Modal from "@/components/modal";
import EditEventForm from "./edit-event-form";

export default async function Page({ params }: { params: { id: string } }) {
  const t = await getI18n();
  const { id } = params;
  const groupId = decode(id);
  const events = await getEventsForGroup(groupId);
  const sections = serializeSections(events);

  return (
    <Modal>
      <CardHeader>
        <CardTitle>{t("createEventForm.title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <EditEventForm sections={sections} />
      </CardContent>
    </Modal>
  );
}
