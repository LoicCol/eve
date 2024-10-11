"use server";

import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/queries";

import EventBreadcrumb from "./breadcrumb";
import { ModeToggle } from "../theme-toggle";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <div className="container mx-auto mb-4 flex h-16 items-center justify-between rounded-lg border px-4 shadow">
      <EventBreadcrumb user={user} />

      <nav className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <Button variant="ghost" asChild>
            <Link href="/events/all">Events</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/groups/all">Groups</Link>
          </Button>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </nav>
    </div>
  );
}
