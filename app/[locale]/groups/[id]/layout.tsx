import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Desktop, Mobile } from "@/components/responsive-helpers";
import GroupDetailsMobile from "@/features/groups/components/group-details-mobile";
import { decode } from "@/util/shorten-uuid";
import JoinModal from "@/features/groups/components/join-modal";
import { getMembers } from "@/features/groups/server/groups.queries";
import { currentUser } from "@clerk/nextjs/server";

export default async function Layout({
  details,
  sidebar,
  children,
  params,
}: {
  details: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
  params: { id: string };
}) {
  const groupId = decode(params.id);
  const [members, currUser] = await Promise.all([
    getMembers(groupId),
    currentUser(),
  ]);
  const hasJoined = members.some((member) => member?.userId === currUser?.id);

  return (
    <>
      <Desktop>
        <div className="relative hidden w-full gap-2 md:flex">
          <ResizablePanelGroup
            direction="horizontal"
            className="border-t bg-background shadow-sm"
          >
            <ResizablePanel className="overflow-hidden" defaultSize={20}>
              {sidebar}
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="flex flex-col p-2" defaultSize={60}>
              <div className="flex flex-1 flex-col overflow-hidden">
                {children}
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel className="bg-card/30 p-4" defaultSize={20}>
              {details}
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </Desktop>

      <Mobile>
        <div className="flex w-full flex-col overflow-auto px-4 pb-6 md:hidden">
          {children}
        </div>
        <GroupDetailsMobile>{details}</GroupDetailsMobile>
      </Mobile>

      <JoinModal groupId={groupId} hasJoined={hasJoined} />
    </>
  );
}
