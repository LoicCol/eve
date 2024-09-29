import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
      <ResizablePanelGroup direction="horizontal" className="rounded-lg border">
        <ResizablePanel className="p-4" defaultSize={25}>
          {children}
          {modal}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-4" defaultSize={75}>
          {events}
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}
