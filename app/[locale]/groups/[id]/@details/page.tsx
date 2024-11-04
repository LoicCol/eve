import { decode } from "@/util/shorten-uuid";
import GroupDetails from "../../../../../src/features/groups/components/group-details";

export default async function Page({ params }: { params: { id: string } }) {
  const groupId = decode(params.id);

  return <GroupDetails groupId={groupId} />;
}
