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
          <BreadcrumbLink className="text-lg" asChild>
            <Link href="/events/all">All events</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-lg">{eventName}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <EventBreadcrumb eventName="Event Name" className="pb-10 " />
      {children}
    </div>
  );
}
