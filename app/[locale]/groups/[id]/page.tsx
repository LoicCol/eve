import { decode } from "@/src/util/shorten-uuid";
import GroupDetails from "./_components/group-details";

export default function Page({ params }: { params: { id: string } }) {
  const groupId = decode(params.id);
  return <GroupDetails groupId={groupId} />;
}
