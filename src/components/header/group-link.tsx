"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BreadcrumbSeparator } from "../ui/breadcrumb";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getGroupName } from "@/lib/actions";
import { decode } from "@/util/shorten-uuid";
import { RotateCw } from "lucide-react";
import { useRef } from "react";
import { useResize } from "@react-spring/web";
import React from "react";
import BreadcrumbItem from "./animated-breadcrumb-item";

export default function GroupLink() {
  const groupContainer = useRef(null);
  const groupStyle = useResize({ container: groupContainer });

  const { id: groupId = "" } = useParams<{
    id: string;
    eventId: string;
  }>();

  const { data: groupName = "", isPending: isPendingGroup } = useQuery({
    queryFn: () => getGroupName(decode(groupId)),
    queryKey: ["group", groupId],
    enabled: Boolean(groupId),
  });

  return (
    <>
      {groupId && <BreadcrumbSeparator />}

      <BreadcrumbItem
        style={{
          width: groupId ? groupStyle.width : 0,
          opacity: groupId ? 1 : 0,
          overflow: "hidden",
        }}
      >
        <div ref={groupContainer} className="flex items-center gap-2">
          {isPendingGroup && <RotateCw className="mr-2 h-4 w-4 animate-spin" />}
          <Button
            variant="link"
            className={`p-0 text-foreground after:bg-primary hover:text-primary ${isPendingGroup ? "opacity-0" : "opacity-100"}`}
            asChild
          >
            <Link href={`/groups/${groupId}`}>{groupName}</Link>
          </Button>
        </div>
      </BreadcrumbItem>
    </>
  );
}
