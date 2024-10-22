"use client";

import Link from "next/link";
import { encode } from "@/util/shorten-uuid";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

interface GroupSidebarProps {
  groups: {
    groupId: string;
    groupName: string;
    createdAt: Date;
  }[];
}

export function GroupSidebar({ groups }: GroupSidebarProps) {
  const params = useParams();
  const router = useRouter();
  const currentGroupId = params.id as string;
  const locale = params.locale as string;
  const [activeGroupId, setActiveGroupId] = useState(currentGroupId);

  const handleGroupClick = (groupId: string, href: string) => {
    setActiveGroupId(encode(groupId));
    setTimeout(() => {
      router.push(href);
    }, 0);
  };

  return (
    <ul className="flex w-96 flex-col gap-2 rounded-sm border border-dashed border-primary/50 p-2">
      {groups.map((group) => {
        const isActive = encode(group.groupId) === activeGroupId;
        return (
          <li
            className={cn("relative w-full cursor-pointer rounded-sm")}
            data-id={`group-${group.groupId}`}
            key={group.groupId}
            onClick={() =>
              handleGroupClick(
                group.groupId,
                `/groups/${encode(group.groupId)}`,
              )
            }
          >
            {isActive ? (
              <motion.div
                className="absolute inset-0 rounded-sm bg-primary/10"
                layoutId={`active-group`}
                transition={{
                  type: "spring",
                  bounce: 0.1,
                  duration: 0.6,
                }}
              />
            ) : null}
            <Link
              href={`/groups/${encode(group.groupId)}`}
              className={cn(
                "flex w-full cursor-pointer flex-col p-4 hover:text-primary",
                isActive && "text-primary",
              )}
            >
              <span className="mb-2 w-full text-sm font-medium">
                {group.groupName}
              </span>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(group.createdAt).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
