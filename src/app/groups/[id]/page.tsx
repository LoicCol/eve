import GroupDetails from "./_components/group-details";

export default function Page({ params }: { params: { id: string } }) {
  return <GroupDetails groupId={params.id} />;
}
