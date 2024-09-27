import { decode } from "@/util/shorten-uuid";
import GroupEvents from "../_components/group-events";

export default function Page({ params }: { params: { id: string } }) {
  const groupId = decode(params.id);
  return <GroupEvents groupId={groupId} />;
}
