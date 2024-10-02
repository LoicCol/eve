"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { joinEvent, editEvent, leaveEvent } from "@/lib/actions";
import ParticipantsList from "@/components/participant-list";
import {
  CalendarIcon,
  Loader,
  MapPinIcon,
  RotateCw,
  UserIcon,
} from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEventFormFields } from "@/types";
import EditableText from "@/components/editable-input";
import { encode } from "@/util/shorten-uuid";
import EditableDate from "@/components/editable-date";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EventDetailsProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    eventDate: Date;
    description: string | null;
    groupId: string | null;
  };
  creator?: {
    userId: string;
    name: string;
    image: string | null;
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
  creator,
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

  const handleSaveName = async (value: string) => {
    mutate({ name: value });
  };

  const handleSaveDate = async (value: Date) => {
    mutate({ date: value.toDateString() });
  };

  const handleSaveLocation = async (value: string) => {
    mutate({ location: value });
  };

  const currentUserParticipation = participants.find(
    (participant) => participant.userId === user?.userId,
  );

  return (
    <Card className="max-w-8xl m-2 flex-1">
      <CardContent className="flex h-full flex-col gap-6 p-6 md:flex-row">
        <div className="flex-1">
          <div className="flex justify-between pb-4">
            <EditableText
              value={event.eventName}
              onSave={handleSaveName}
              isPending={isPending}
            >
              <h1 className="text-xl font-bold">
                {variables?.name || event.eventName}
              </h1>
            </EditableText>
            <ParticipationButton
              eventId={event.eventId}
              currentUserParticipation={currentUserParticipation}
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center text-muted-foreground">
              <EditableDate
                value={event.eventDate}
                onSave={handleSaveDate}
                isPending={isPending}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                <span>
                  {new Date(
                    variables?.date || event.eventDate,
                  ).toLocaleString()}
                </span>
              </EditableDate>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPinIcon className="mr-2 h-5 w-5" />
              <EditableText
                value={event.location}
                onSave={handleSaveLocation}
                isPending={isPending}
              >
                <span>{variables?.location || event.location}</span>
              </EditableText>
            </div>
            <div className="flex items-center">
              <UserIcon className="mr-2 h-5 w-5 text-muted-foreground" />
              <span className="mr-2 text-muted-foreground">Created by:</span>
              <Avatar className="mr-2 h-6 w-6">
                <AvatarImage src={creator?.image || ""} />
                <AvatarFallback>{creator?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{creator?.name}</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Participants</h2>
              <ParticipantsList participants={participants} />
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
      </CardContent>
    </Card>
  );
}

function ParticipationButton({
  eventId,
  currentUserParticipation,
}: {
  eventId: string;
  currentUserParticipation?: {
    status: "participate" | "maybe";
  };
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ status }: { status: string }) => {
      if (status === "participate") {
        return joinEvent(eventId, "participate");
      }

      if (status === "maybe") {
        return joinEvent(eventId, "maybe");
      }

      return leaveEvent(eventId);
    },
  });

  const handleSelect = (value: string) => {
    mutate({ status: value });
  };

  const value = currentUserParticipation?.status || "leave";

  return (
    <div className="flex items-center">
      {isPending && <Loader className="mr-2 h-4 w-4 animate-spin" />}

      <Select onValueChange={handleSelect} value={value}>
        <SelectTrigger className="w-auto px-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="participate">Participate</SelectItem>
          <SelectItem value="maybe">Maybe</SelectItem>
          <SelectItem value="leave">Not going</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
