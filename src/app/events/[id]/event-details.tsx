"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { joinEvent } from "@/lib/actions";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EventDetailsProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    eventDate: Date;
    description: string | null;
  };
  user?: {
    userId: string;
    name: string;
    image: string | null;
  };
  participants: {
    userId?: string;
    name?: string;
    image?: string | null;
    status: "participate" | "maybe";
  }[];
}

export default function EventDetails({
  event,
  user,
  participants,
}: EventDetailsProps) {
  const handleParticipate = async () => {
    if (!user) return;
    console.log(user.userId, event.eventId);
    await joinEvent(event.eventId, "participate");
  };

  const handleMaybe = async () => {
    if (!user) return;
    await joinEvent(event.eventId, "maybe");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.eventName}</CardTitle>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col">
        <p className="text-muted-foreground">Location: {event.location}</p>
        <p className="text-muted-foreground">
          Date: {new Date(event.eventDate).toLocaleString()}
        </p>
        {event.description ? (
          <p>{event.description}</p>
        ) : (
          <i className="text-muted-foreground">No description</i>
        )}
        <div className="flex items-center">
          <p className="text-muted-foreground pr-2">Created by: {user?.name}</p>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {participants.map((participant) => (
            <Tooltip key={participant.userId}>
              <TooltipTrigger>
                <Avatar>
                  <AvatarImage src={participant.image || ""} />
                  <AvatarFallback>{participant.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent
                className={`bg-${
                  participant.status === "participate"
                    ? "green-500"
                    : "orange-500"
                }`}
              >
                <p>{participant.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          className="bg-green-500 hover:bg-green-400"
          onClick={handleParticipate}
        >
          Participate
        </Button>
        <Button
          className="bg-orange-500 hover:bg-orange-400"
          onClick={handleMaybe}
        >
          Maybe
        </Button>
      </CardFooter>
    </Card>
  );
}
