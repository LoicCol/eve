import { decode } from "@/util/shorten-uuid";
import GroupDetails from "./_components/group-details";

export default function Default({ params }: { params: { id: string } }) {
  const groupId = decode(params.id);
  return <GroupDetails groupId={groupId} />;
}
