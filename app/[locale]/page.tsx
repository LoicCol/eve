import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Welcome to Event Manager</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Organize and manage events with your friends easily. Create groups, plan
        events, and keep track of who&#39;s attending.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              View and manage your upcoming events here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Stay up to date with all your planned activities.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/events/all">View Events</Link>
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Groups</CardTitle>
            <CardDescription>
              Manage your friend groups and create new ones.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Organize your friends into groups for easier event planning.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/groups/all">View Groups</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
