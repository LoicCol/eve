import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";

interface BreadcrumbProps {
  eventName: string;
  className?: string;
}

const EventBreadcrumb: React.FC<BreadcrumbProps> = ({
  eventName,
  className,
}) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Button
              variant="link"
              className="p-0 text-foreground after:bg-primary hover:text-primary"
              asChild
            >
              <Link href="/groups/all">All groups</Link>
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{eventName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

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
    <div className="container mx-auto px-4 flex flex-col">
      <EventBreadcrumb
        eventName="Group Name"
        className="px-4 mb-4 border border-dashed border-stone-300 rounded-md w-fit"
      />
      <ResizablePanelGroup direction="horizontal" className="border rounded-lg">
        <ResizablePanel className="p-4" defaultSize={25}>
          {children}
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel className="p-4" defaultSize={75}>
          {events}
        </ResizablePanel>
      </ResizablePanelGroup>
      {modal}
    </div>
  );
}
