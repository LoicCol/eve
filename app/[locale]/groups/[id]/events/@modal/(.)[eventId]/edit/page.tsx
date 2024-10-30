import EditPage from "../../../../../../../../src/features/events/components/edit-page";

export default async function Page({
  params,
}: {
  params: { id: string; eventId: string };
}) {
  return <EditPage params={params} />;
}
