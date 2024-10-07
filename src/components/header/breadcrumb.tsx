"use server";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Loader } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { getCurrentUser } from "@/server/queries";
import GroupLink from "./group-link";
import EventLink from "./event-link";
import React from "react";

export default async function EventBreadcrumb() {
  const user = await getCurrentUser();

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

        {user && (
          <>
            <BreadcrumbSeparator />
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
                <Link href="/groups/all" className="capitalize">
                  {`${user?.name}'s groups`}
                </Link>
              </Button>
            </BreadcrumbItem>
          </>
        )}

        <GroupLink />

        <EventLink />
      </BreadcrumbList>
    </Breadcrumb>
  );
}
