"use server";

import { SignedIn } from "@clerk/nextjs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import EventBreadcrumb from "./breadcrumb";
import { getCurrentUser } from "@/server/queries";
import { useGroupDetailsSidebar } from "@/util/group-details-sidebar";
import { Button } from "@/components/ui/button";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <SignedIn>
      <header className="flex w-screen shrink-0 items-center gap-2 md:w-full">
        <div className="flex flex-1 items-center gap-2 overflow-hidden px-4">
          <SidebarTrigger className="size-5" />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex h-16 flex-1 items-center justify-between overflow-hidden md:rounded-lg">
              <EventBreadcrumb user={user} />
            </div>
          </div>
          <GroupDetailsSidebarTrigger />
        </div>
      </header>
    </SignedIn>
  );
}

function GroupDetailsSidebarTrigger() {
  const { setIsOpen } = useGroupDetailsSidebar();

  return <Button onClick={() => setIsOpen(true)}>Open</Button>;
}
