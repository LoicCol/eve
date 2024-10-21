"use server";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { getCurrentUser } from "server/queries";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import EventBreadcrumb from "./breadcrumb";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <SignedIn>
      <header className="flex shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="h-5 w-5" />{" "}
          <Separator orientation="vertical" className="mx-2 h-4" />
          <div className="overflow-hidden">
            <div className="flex h-16 items-center justify-between md:rounded-lg">
              <EventBreadcrumb user={user} />

              <nav className="flex items-center space-x-4 md:space-x-6">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn></SignedIn>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </SignedIn>
  );
}
