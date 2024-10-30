"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGroupNameAction } from "../server/header.actions";
import { decode } from "@/util/shorten-uuid";
import { Loader } from "lucide-react";
import { Fragment, useRef } from "react";
import { useResize } from "@react-spring/web";
import React from "react";
import BreadcrumbItem from "./animated-breadcrumb-item";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

export default function GroupLink() {
  const groupContainer = useRef(null);
  const groupStyle = useResize({ container: groupContainer });
  const isMobile = useIsMobile();

  const params = useParams<{ id: string; eventId: string }>();
  const groupId = params?.id ?? "";
  const isEventDetailsPage = Boolean(params?.eventId);

  const { data: groupName = "", isPending: isPendingGroup } = useQuery({
    queryFn: () => getGroupNameAction(decode(groupId)),
    queryKey: ["group", groupId],
    enabled: Boolean(groupId),
  });

  return (
    <Fragment>
      {!isMobile && groupId && <BreadcrumbSeparator />}
      <BreadcrumbItem
        style={{
          width: groupId ? groupStyle.width : 0,
          opacity: groupId ? 1 : 0,
          overflow: "hidden",
          animationDuration: "0.2s",
          animationDelay: "0.1s",
          height: "100%",
          flexShrink: 0,
        }}
      >
        <div ref={groupContainer} className="flex items-center gap-2">
          {isMobile && groupId && (
            <Separator orientation="vertical" className="mx-2 h-4" />
          )}
          {isPendingGroup && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          <GroupContent
            groupId={groupId}
            groupName={groupName}
            isPendingGroup={isPendingGroup}
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
}

const GroupContent: React.FC<GroupContentProps> = ({
  groupId,
  groupName,
  isPendingGroup,
}) => {
  return (
    <Button
      variant="link"
      className={`overflow-hidden p-0 text-foreground after:bg-primary hover:text-primary ${isPendingGroup ? "opacity-0" : "opacity-100"}`}
      asChild
    >
      <Link href={`/groups/${groupId}/events`}>{groupName}</Link>
    </Button>
  );
};
