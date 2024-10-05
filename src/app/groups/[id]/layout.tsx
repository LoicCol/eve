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
      <div className="md:hidden">
        {events}

        <Sheet>
          <SheetTrigger>
            <button className="btn">Open Sheet</button>
          </SheetTrigger>
          <SheetContent className="w-svw">
            {modal}
            {children}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
