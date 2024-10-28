import { getCurrentUserGroups } from "@/features/groups/server/groups.actions";
import { GroupSidebar } from "@/features/groups/components/group-sidebar";

export default async function Page() {
  const groups = await getCurrentUserGroups();

  const serializedGroups = groups.map((group) => ({
    groupId: group.groupId,
    groupName: group.groupName,
    createdAt: group.createdAt,
  }));

  return <GroupSidebar groups={serializedGroups} />;
}
