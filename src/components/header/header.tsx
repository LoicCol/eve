"use server";

import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { getCurrentUser } from "server/queries";

import EventBreadcrumb from "./breadcrumb";

export default async function Header() {
  const user = await getCurrentUser();

  return (
    <SignedIn>
      <div className="overflow-hidden">
        <div className="flex h-16 items-center justify-between border-b md:rounded-lg md:border-none">
          <EventBreadcrumb user={user} />

          <nav className="flex items-center space-x-4 md:space-x-6">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn></SignedIn>
          </nav>
        </div>
      </div>
    </SignedIn>
  );
}
