"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { joinEvent, editEvent } from "@/lib/actions";
import ParticipantsList from "@/components/participant-list";
import { CalendarIcon, MapPinIcon, UserIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEventFormFields } from "@/types";
import EditableText from "@/components/editable-input";
import { encode } from "@/util/shorten-uuid";

interface EventDetailsProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    eventDate: Date;
    description: string | null;
    groupId: string | null;
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
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (data: Partial<CreateEventFormFields>) =>
      editEvent(event.eventId, {
        name: data.name || event.eventName,
        location: data.location || event.location,
        date: data.date || event.eventDate.toISOString(),
        group: data.group || event.groupId || "",
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["event", encode(event.eventId)],
      });
    },
  });

  const handleParticipate = async () => {
    await joinEvent(event.eventId, "participate");
  };

  const handleMaybe = async () => {
    await joinEvent(event.eventId, "maybe");
  };

  const handleSave = async (value: string) => {
    mutate({ name: value });
  };

  return (
    <Card className="max-w-8xl mx-2 mb-2 flex-1">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex-1">
            <div className="flex pb-4">
              <EditableText
                value={event.eventName}
                onSave={handleSave}
                isPending={isPending}
              >
                <h1 className="text-xl font-bold">
                  {variables?.name || event.eventName}
                </h1>
              </EditableText>
            </div>
            <div className="space-y-4">
              <div className="flex items-center text-muted-foreground">
                <CalendarIcon className="mr-2 h-5 w-5" />
                <span>{new Date(event.eventDate).toLocaleString()}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPinIcon className="mr-2 h-5 w-5" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <UserIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="mr-2 text-muted-foreground">Created by:</span>
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarImage src={user?.image || ""} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{user?.name}</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Participants</h2>
                <ParticipantsList participants={participants} />
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  className="bg-green-500 hover:bg-green-600"
                  onClick={handleParticipate}
                >
                  Participate
                </Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handleMaybe}
                >
                  Maybe
                </Button>
              </div>
            </div>
          </div>
          <div className="flex-1 border-t border-dashed border-border pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
            <h2 className="mb-2 text-xl font-semibold">Description</h2>
            {event.description ? (
              <p className="text-muted-foreground">{event.description}</p>
            ) : (
              <p className="italic text-muted-foreground">
                No description provided
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
