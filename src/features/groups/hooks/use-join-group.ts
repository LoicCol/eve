import { useMutation } from "@tanstack/react-query";
import { joinGroup } from "../server/groups.actions";
import { leaveGroup } from "../server/groups.actions";

export function useJoinGroup({
  hasJoined,
  groupId,
}: {
  hasJoined: boolean;
  groupId: string;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: hasJoined ? leaveGroup : joinGroup,
  });

  const handleJoin = async () => {
    mutate(groupId);
  };

  return { handleJoin, isPending };
}
