"use client";

import Link from "next/link";
import { encode } from "@/util/shorten-uuid";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useI18n } from "@/locales/client";

interface GroupSidebarProps {
  groups: {
    groupId: string;
    groupName: string;
    createdAt: Date;
  }[];
}

export function GroupSidebar({ groups }: GroupSidebarProps) {
  const t = useI18n();
  const params = useParams();
  const currentGroupId = params.id as string;
  const locale = params.locale as string;

  return (
    <div className="flex size-full flex-col rounded-sm pr-1">
      <p className="px-6 py-5 font-sofia text-xl">{t("header.groups")}</p>
      <Separator className="mx-4 w-auto" />
      <ul className="flex flex-1 flex-col gap-2 overflow-auto p-2">
        {groups.map((group) => {
          const isActive = encode(group.groupId) === currentGroupId;
          return (
            <li
              className={cn("relative w-full cursor-pointer rounded-sm")}
              data-id={`group-${group.groupId}`}
              key={group.groupId}
            >
              {isActive ? (
                <motion.div
                  className="absolute inset-0 rounded-sm border border-dashed border-primary/50 bg-primary/10"
                  layoutId={`active-group`}
                  transition={{
                    type: "spring",
                    bounce: 0.1,
                    duration: 0.6,
                  }}
                />
              ) : null}
              <Link
                href={`/groups/${encode(group.groupId)}/events`}
                className={cn(
                  "flex w-full cursor-pointer flex-col p-4 hover:text-primary",
                  isActive && "text-primary",
                )}
                scroll={false}
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
    </div>
  );
}
