import GroupDetails from "./group-details";

export default function Page({ params }: { params: { id: string } }) {
  return <GroupDetails groupId={params.id} />;
}
