"use client";

import { useI18n } from "@/locales/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Loader } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import GroupLink from "./group-link";
import EventLink from "./event-link";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Separator } from "@/components/ui/separator";

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
      <BreadcrumbList className="h-full w-[calc(100%-36px)] flex-nowrap overflow-hidden md:w-full">
        {!isMobile && user ? (
          <div className="hidden items-center md:flex">
            <Separator
              orientation="vertical"
              className="mx-2 h-4 md:ml-2 md:mr-4"
            />
            <BreadcrumbItem className="flex items-center gap-2">
              <Avatar className="size-6">
                <AvatarImage src={user?.image || ""} alt="user-image" />
                <AvatarFallback>
                  <Loader className="size-4 animate-spin" />
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
          </div>
        ) : null}

        <GroupLink />

        {!isMobile ? <EventLink /> : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
