import GroupDetailsSidebarTrigger from "./group-details-sidebar-trigger";
import { Card, CardContent } from "@/components/ui/card";
import GroupDetailsSidebarContainer from "./group-details-sidebar-container";
import JoinModal from "./join-modal";
import { getMembers } from "../server/groups.queries";
import { currentUser } from "@clerk/nextjs/server";

export default async function GroupDetailsMobile({
  children,
  groupId,
}: {
  children: React.ReactNode;
  groupId: string;
}) {
  const [members, currUser] = await Promise.all([
    getMembers(groupId),
    currentUser(),
  ]);
  const hasJoined = members.some((member) => member?.userId === currUser?.id);

  return (
    <>
      <GroupDetailsSidebarTrigger />
      <GroupDetailsSidebarContainer>
        <Card className="mt-2 h-auto w-full bg-card py-2">
          <CardContent>{children}</CardContent>
        </Card>
      </GroupDetailsSidebarContainer>
      <JoinModal groupId={groupId} hasJoined={hasJoined} />
    </>
  );
}
