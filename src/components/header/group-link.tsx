"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BreadcrumbSeparator } from "../ui/breadcrumb";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGroupName } from "server/actions/actions";
import { decode } from "@/util/shorten-uuid";
import { Loader, Users } from "lucide-react";
import { Fragment, useRef } from "react";
import { useResize } from "@react-spring/web";
import React from "react";
import BreadcrumbItem from "./animated-breadcrumb-item";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function GroupLink() {
  const groupContainer = useRef(null);
  const groupStyle = useResize({ container: groupContainer });
  const isMobile = useIsMobile();

  const params = useParams<{ id: string; eventId: string }>();
  const groupId = params?.id ?? "";
  const isEventDetailsPage = Boolean(params?.eventId);

  const { data: groupName = "", isPending: isPendingGroup } = useQuery({
    queryFn: () => getGroupName(decode(groupId)),
    queryKey: ["group", groupId],
    enabled: Boolean(groupId),
  });

  if (!groupId) {
    return null;
  }

  return (
    <Fragment>
      {!isMobile && <BreadcrumbSeparator />}
      <BreadcrumbItem
        style={{
          width: groupStyle.width,
          opacity: 1,
          overflow: "hidden",
          animationDuration: "0.2s",
          animationDelay: "0.1s",
        }}
      >
        <div ref={groupContainer} className="flex items-center gap-2">
          <GroupContent
            groupId={groupId}
            groupName={groupName}
            isPendingGroup={isPendingGroup}
            isEventDetailsPage={isEventDetailsPage}
          />
        </div>
      </BreadcrumbItem>
    </Fragment>
  );
}

interface GroupContentProps {
  groupId: string;
  groupName: string;
  isPendingGroup: boolean;
  isEventDetailsPage: boolean;
}

const GroupContent: React.FC<GroupContentProps> = ({
  groupId,
  groupName,
  isPendingGroup,
  isEventDetailsPage,
}) => {
  const isMobile = useIsMobile();

  if (isPendingGroup) {
    return <Loader className="mr-2 h-4 w-4 animate-spin" />;
  }

  if (isEventDetailsPage && isMobile) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="p-0 text-foreground hover:text-primary"
              asChild
            >
              <Link href={`/groups/${groupId}`}>
                <Users className="h-4 w-4" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{groupName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant="link"
      className="p-0 text-foreground after:bg-primary hover:text-primary"
      asChild
    >
      <Link href={`/groups/${groupId}`}>{groupName}</Link>
    </Button>
  );
};
