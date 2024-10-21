"use server";

import { SignedIn } from "@clerk/nextjs";
import { getCurrentUser } from "server/queries";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import EventBreadcrumb from "./breadcrumb";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <SignedIn>
      <header className="flex w-screen shrink-0 items-center gap-2 md:w-full">
        <div className="flex flex-1 items-center gap-2 overflow-hidden px-4">
          <SidebarTrigger className="h-5 w-5" />{" "}
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="flex flex-1 overflow-hidden">
            <div className="flex h-16 flex-1 items-center justify-between overflow-hidden md:rounded-lg">
              <EventBreadcrumb user={user} />
            </div>
          </div>
        </div>
      </header>
    </SignedIn>
  );
}
