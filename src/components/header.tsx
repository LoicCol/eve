import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b">
      <div
        className={`container mx-auto px-4 h-16 flex justify-between items-center`}
      >
        <Link href="/" className="text-xl font-bold text-primary">
          Eve
        </Link>
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
    </header>
  );
}
