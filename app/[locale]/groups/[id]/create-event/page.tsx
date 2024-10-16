import CreateEventForm from "../create-event-form";
import { decode } from "@/util/shorten-uuid";
import { getEventsForGroup } from "@/server/queries";
import CloseButton from "./close-button";

export default async function Page({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  const groupId = decode(id);
  const events = await getEventsForGroup(groupId);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg">
        <CloseButton groupId={id} locale={locale} />
        <CreateEventForm sections={sections} />
      </div>
    </div>
  );
}
