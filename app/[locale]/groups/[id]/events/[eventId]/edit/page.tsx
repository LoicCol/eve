import EditPage from "./edit-page";

export default async function Page({
  params,
}: {
  params: { id: string; eventId: string };
}) {
  return <EditPage params={params} />;
}
