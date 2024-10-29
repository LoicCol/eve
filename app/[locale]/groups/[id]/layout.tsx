import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Desktop, Mobile } from "@/components/responsive-helpers";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useGroupDetailsSidebar } from "@/util/group-details-sidebar";
import GroupDetailsSidebarContainer from "@/features/groups/components/group-details-sidebar-container";

export default async function Layout({
  details,
  sidebar,
  children,
}: {
  details: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
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

        <GroupDetailsSidebarContainer>
          <Card className="mt-2 h-auto bg-card">
            <CardContent>{details}</CardContent>
          </Card>
        </GroupDetailsSidebarContainer>
      </Mobile>
    </>
  );
}
