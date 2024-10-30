import EventsHeader from "@/features/events/components/events-header";
import { getGroup } from "@/features/groups/server/groups.queries";
import { decode } from "@/util/shorten-uuid";
import { Separator } from "@/components/ui/separator";

export default async function Layout({
  children,
  params,
  modal,
}: {
  children: React.ReactNode;
  params: { id: string };
  modal: React.ReactNode;
}) {
  const group = await getGroup(decode(params.id));

  return (
    <>
      <EventsHeader groupId={params.id} groupName={group?.groupName} />
      <Separator className="mb-4 mt-3 w-auto md:mx-2 md:mt-2" />
      {children}
      {modal}
    </>
  );
}
