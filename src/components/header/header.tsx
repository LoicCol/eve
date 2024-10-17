"use server";

import { getI18n } from "@/locales/server";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/server/queries";

import EventBreadcrumb from "./breadcrumb";
import { ModeToggle } from "../theme-toggle";

export default async function Header() {
  const t = await getI18n();
  const user = await getCurrentUser();

  return (
    <SignedIn>
      <div className="container mx-auto mb-4 flex h-16 items-center justify-between border px-4 shadow-sm md:rounded-lg">
        <EventBreadcrumb user={user} />

        <nav className="flex items-center space-x-1 md:space-x-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <Button variant="ghost" asChild>
              <Link href="/events/all">{t("header.events")}</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/groups/all">{t("header.groups")}</Link>
            </Button>
            <UserButton />
          </SignedIn>
          <ModeToggle />
        </nav>
      </div>
    </SignedIn>
  );
}
