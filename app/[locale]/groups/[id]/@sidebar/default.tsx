import { getCurrentUserGroups } from "server/actions/actions";
import { GroupSidebar } from "./group-sidebar";

export default async function Default() {
  const groups = await getCurrentUserGroups();

  const serializedGroups = groups.map((group) => ({
    groupId: group.groupId,
    groupName: group.groupName,
    createdAt: group.createdAt,
  }));

  return <GroupSidebar groups={serializedGroups} />;
}
