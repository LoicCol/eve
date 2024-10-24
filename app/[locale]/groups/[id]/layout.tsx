import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Desktop, Mobile } from "@/components/responsive-helpers";

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
        <Tabs
          defaultValue="details"
          className="flex w-full flex-col px-4 pb-6 md:hidden"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="flex-1">
            <Card className="mt-2 h-full py-4">
              <CardContent>{details}</CardContent>
            </Card>
          </TabsContent>
          <TabsContent className="pb-2" value="events">
            {children}
          </TabsContent>
        </Tabs>
      </Mobile>
    </>
  );
}
