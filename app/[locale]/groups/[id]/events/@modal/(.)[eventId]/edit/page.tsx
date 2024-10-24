import EditPage from "../../../[eventId]/edit/edit-page";

export default async function Page({
  params,
}: {
  params: { id: string; eventId: string };
}) {
  return <EditPage params={params} />;
}
