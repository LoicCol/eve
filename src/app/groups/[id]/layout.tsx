import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({
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
      <ResizablePanelGroup
        direction="horizontal"
        className="rounded-lg border sm:hidden"
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
      <div className="md:hidden">
        {children}
        <Sheet>
          <SheetTrigger>
            <button className="btn">Open Sheet</button>
          </SheetTrigger>
          <SheetContent>
            {modal}
            {events}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
