"use client";

import { useI18n } from "@/locales/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "../ui/breadcrumb";
import { Loader } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import GroupLink from "./group-link";
import EventLink from "./event-link";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface EventBreadcrumbProps {
  user?: {
    name?: string;
    image?: string | null;
  } | null;
}

export default function EventBreadcrumb({ user }: EventBreadcrumbProps) {
  const t = useI18n();
  const isMobile = useIsMobile();

  return (
    <Breadcrumb className="h-full flex-1 overflow-hidden">
      <BreadcrumbList className="h-full flex-nowrap overflow-hidden">
        {!isMobile && user ? (
          <BreadcrumbItem className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.image || ""} alt="user-image" />
              <AvatarFallback>
                <Loader className="h-4 w-4 animate-spin" />
              </AvatarFallback>
            </Avatar>
            <Button
              variant="link"
              className="flex items-center p-0 text-foreground after:bg-primary hover:text-primary"
              asChild
            >
              <Link href="/groups/all">
                {t("breadcrumb.userGroups", { name: user?.name })}
              </Link>
            </Button>
          </BreadcrumbItem>
        ) : null}

        <GroupLink />

        <EventLink />
      </BreadcrumbList>
    </Breadcrumb>
  );
}
