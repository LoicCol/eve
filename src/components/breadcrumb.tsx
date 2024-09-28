"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGroupName, getEventName } from "@/lib/actions";
import { decode } from "@/util/shorten-uuid";
import { RotateCw } from "lucide-react";

export default function EventBreadcrumb() {
  const { id: groupId = "", eventId = "" } = useParams<{
    id: string;
    eventId: string;
  }>();

  const { data: groupName = "", isPending: isPendingGroup } = useQuery({
    queryFn: () => getGroupName(decode(groupId)),
    queryKey: ["group", groupId],
    enabled: Boolean(groupId),
  });

  const { data: eventName = "", isPending: isPendingEvent } = useQuery({
    queryFn: () => getEventName(decode(eventId)),
    queryKey: ["event", eventId],
    enabled: Boolean(eventId),
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="p-0">
          <BreadcrumbLink asChild>
            <Link
              href="/"
              className="text-xl font-bold text-primary transition-colors duration-300 ease-in-out"
            >
              Eve
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Button
              variant="link"
              className="flex items-center p-0 text-foreground transition-all duration-300 ease-in-out after:bg-primary hover:translate-y-[-1px] hover:text-primary"
              asChild
            >
              <Link href="/groups/all">All groups</Link>
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {groupId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isPendingGroup && (
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              )}
              <Button
                variant="link"
                className="flex items-center p-0 text-foreground after:bg-primary hover:text-primary"
                asChild
              >
                <Link href={`/groups/${groupId}`}>{groupName}</Link>
              </Button>
            </BreadcrumbItem>
          </>
        )}
        {eventId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isPendingEvent && (
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
              )}

              <Button
                variant="link"
                className="flex items-center p-0 text-foreground after:bg-primary hover:text-primary"
                asChild
              >
                <Link href={`/groups/${groupId}/events/${eventId}`}>
                  {eventName}
                </Link>
              </Button>
              <BreadcrumbPage>{}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
