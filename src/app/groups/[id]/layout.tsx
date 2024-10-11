import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default async function Layout({
  children,
  events,
  modal,
}: {
  children: React.ReactNode;
  events: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden w-full md:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border shadow"
        >
          <ResizablePanel className="bg-card/30 p-4" defaultSize={30}>
            {children}
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel className="flex flex-col p-2" defaultSize={70}>
            <div className="flex flex-1 flex-col overflow-hidden">{events}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Mobile */}
      <Tabs
        defaultValue="details"
        className="flex w-full flex-col px-4 pb-4 md:hidden"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="flex-1">
          <Card className="mt-2 h-full py-4">
            <CardContent>{children}</CardContent>
          </Card>
        </TabsContent>
        <TabsContent className="pb-2" value="events">
          {events}
        </TabsContent>
      </Tabs>

      {modal}
    </>
  );
}
