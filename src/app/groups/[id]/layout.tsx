import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import EventsHeader from "./_components/events-header";
import { getGroup } from "@/server/queries";
import { decode } from "@/util/shorten-uuid";
import { Info } from "lucide-react";

export default async function Layout({
  children,
  events,
  modal,
  params,
}: {
  children: React.ReactNode;
  events: React.ReactNode;
  modal: React.ReactNode;
  params: { id: string };
}) {
  const group = await getGroup(decode(params.id));

  return (
    <>
      <div className="hidden w-full md:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="rounded-lg border"
        >
          <ResizablePanel className="p-4" defaultSize={25}>
            {children}
            {modal}
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel className="flex flex-col p-2" defaultSize={75}>
            <div className="flex flex-1 flex-col overflow-hidden">{events}</div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="w-full px-4 md:hidden">
        <Sheet>
          <SheetHeader className="grid grid-cols-2">
            <SheetTrigger>
              <button className="btn">
                <Info />
              </button>
            </SheetTrigger>
            <EventsHeader groupId={params.id} groupName={group?.groupName} />
          </SheetHeader>
          {events}
          <SheetContent className="w-svw">
            {modal}
            {children}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
