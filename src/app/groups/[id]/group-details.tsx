"use server";

import {
  getGroup,
  getEventsForGroup,
  getUser,
  getMembers,
} from "@/server/queries";
import EventCard from "@/components/event-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Group } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import JoinButton from "./join-button";
import { currentUser } from "@clerk/nextjs/server";

export default async function GroupDetails({ groupId }: { groupId: string }) {
  const [group, events, members, currUser] = await Promise.all([
    getGroup(groupId),
    getEventsForGroup(groupId),
    getMembers(groupId),
    currentUser(),
  ]);

  if (!group) {
    return <div>Not found</div>;
  }
  const user = await getUser(group.createdBy);
  const asJoined = members.some((member) => member?.userId === currUser?.id);

  return (
    <ResizablePanelGroup direction="horizontal" className="border rounded-lg">
      <ResizablePanel className="p-4" defaultSize={30}>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{group.groupName}</h1>
          <JoinButton groupId={groupId} asJoined={asJoined} />
        </div>

        <div className="mt-6">
          {group.description ? (
            <p className="text-muted-foreground">{group.description}</p>
          ) : (
            <i className="text-muted-foreground">No description</i>
          )}
        </div>

        <div className="mt-4">
          <p className="text-muted-foreground pr-2">Created by:</p>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-foreground">{user?.name}</p>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <p className="text-muted-foreground pr-2">Members:</p>
          {members.map((member) => (
            <Avatar key={member?.userId}>
              <AvatarImage src={member?.image || ""} />
              <AvatarFallback>{member?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="p-4" defaultSize={70}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Events</h2>
          <div className="flex gap-2">
            <Button variant="outline">
              <Group className="mr-2 h-4 w-4" /> Link Events
            </Button>
            <Button asChild>
              <Link href={`/events/create-event`}>
                <Calendar className="mr-2 h-4 w-4" />
                Create Event
              </Link>
            </Button>
          </div>
        </div>

        {events.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard event={event} key={event.eventId} />
            ))}
          </div>
        ) : (
          <p>No events found</p>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
