"use server";

import { getI18n } from "@/locales/server";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getCurrentUser } from "server/queries";

import EventBreadcrumb from "./breadcrumb";
import { ModeToggle } from "../theme-toggle";

export default async function Header() {
  const t = await getI18n();
  const user = await getCurrentUser();

  return (
    <SignedIn>
      <div className="container mx-auto mb-4 bg-gradient-to-t from-border to-green-300 p-[1px] dark:to-green-900 md:rounded-lg">
        <div className="flex h-16 items-center justify-between bg-background px-4 md:rounded-lg">
          <EventBreadcrumb user={user} />

          <nav className="flex items-center space-x-4 md:space-x-6">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <Button
                variant="link"
                asChild
                className="p-0 text-foreground hover:text-primary"
              >
                <Link href="/events/all">{t("header.events")}</Link>
              </Button>
              <Button
                variant="link"
                asChild
                className="p-0 text-foreground hover:text-primary"
              >
                <Link href="/groups/all">{t("header.groups")}</Link>
              </Button>
              <UserButton />
            </SignedIn>
            <ModeToggle />
          </nav>
        </div>
      </div>
    </SignedIn>
  );
}
