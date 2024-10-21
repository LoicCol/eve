"use client";

import * as React from "react";
import { CalendarCheck2, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./theme-toggle";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useI18n();
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const isActive = (path: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    return pathSegments.length > 1 && pathSegments[1] === path.slice(1);
  };

  return (
    <Sidebar variant="inset" className="w-44" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-4">
            <Link
              href="/"
              className="font-sofia text-4xl font-bold text-primary transition-colors duration-300 ease-in-out"
            >
              {t("breadcrumb.appName")}
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="flex flex-col gap-3">
            <SidebarMenuItem>
              <SidebarMenuButton
                variant={isActive("/groups") ? "outline" : "default"}
                asChild
              >
                <Link
                  href="/groups/all"
                  onClick={() => isMobile && setOpenMobile(false)}
                >
                  <Users /> {t("header.groups")}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                variant={isActive("/events") ? "outline" : "default"}
                asChild
              >
                <Link
                  href="/events/all"
                  onClick={() => isMobile && setOpenMobile(false)}
                >
                  <CalendarCheck2 />
                  {t("header.events")}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center justify-center gap-4 p-4">
        <UserButton />
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
