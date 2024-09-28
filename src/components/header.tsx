import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

import EventBreadcrumb from "./breadcrumb";

export default function Header() {
  return (
    <div className="container mx-auto mb-4 flex h-16 items-center justify-between rounded-lg border px-4">
      <EventBreadcrumb />

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
      </nav>
    </div>
  );
}
