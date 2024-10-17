import { decode } from "@/util/shorten-uuid";
import GroupEvents from "../group-events";
import { getGroupEvents } from "server/actions/actions";
import { QueryClient } from "@tanstack/react-query";

export default async function Page({ params }: { params: { id: string } }) {
  const groupId = decode(params.id);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events", groupId, "upcoming"],
    queryFn: async () => getGroupEvents(groupId, "upcoming"),
  });

  return <GroupEvents groupId={groupId} />;
}
