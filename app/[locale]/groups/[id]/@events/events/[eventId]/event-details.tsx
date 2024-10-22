"use client";

import { Card, CardContent } from "@/components/ui/card";
import { joinEvent, editEvent, leaveEvent } from "server/actions/actions";
import ParticipantsList from "@/components/participant-list";
import { CalendarIcon, Loader, MapPinIcon, UserIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEventFormFields } from "types";
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
import EditableTextArea from "@/components/editable-text-area";
import { useI18n } from "@/locales/client";
import { Separator } from "@/components/ui/separator";

interface EventDetailsProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    eventDate: Date;
    description: string | null;
    groupId: string | null;
    sectionId: string | null;
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
  const t = useI18n();
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (data: Partial<CreateEventFormFields>) =>
      editEvent(event.eventId, {
        name: data.name || event.eventName,
        location: data.location || event.location,
        date: data.date || event.eventDate.toISOString(),
        group: data.group || event.groupId || "",
        description:
          data.description === ""
            ? ""
            : data.description || event.description || "",
        sectionId: event.sectionId || null,
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: ["event", encode(event.eventId)],
      });
    },
  });

  const handleSaveName = (value: string) => {
    mutate({ name: value });
  };

  const handleSaveDate = (value: Date) => {
    mutate({ date: value.toDateString() });
  };

  const handleSaveLocation = (value: string) => {
    mutate({ location: value });
  };

  const handleSaveDescription = (value: string) => {
    mutate({ description: value });
  };

  const currentUserParticipation = participants.find(
    (participant) => participant.userId === user?.userId,
  );

  return (
    <Card className="flex-1 overflow-hidden border-none shadow-none md:m-2">
      <CardContent className="flex h-full flex-col gap-4 p-4 md:flex-row">
        <div className="flex-1">
          <div className="flex justify-between gap-2 pb-4">
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
                <CalendarIcon className="mr-2 size-5" />
                <span>
                  {new Date(
                    variables?.date || event.eventDate,
                  ).toLocaleDateString("en-UK", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </EditableDate>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPinIcon className="mr-2 size-5" />
              <EditableText
                value={event.location}
                onSave={handleSaveLocation}
                isPending={isPending}
              >
                <span>{variables?.location || event.location}</span>
              </EditableText>
            </div>
            <div className="flex items-center">
              <UserIcon className="mr-2 size-5 text-muted-foreground" />
              <span className="mr-2 text-muted-foreground">
                {t("eventDetails.createdBy")}:
              </span>
              <span>{creator?.name}</span>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">
                {t("eventDetails.participants")}
              </h2>
              <ParticipantsList participants={participants} />
            </div>
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="ml-2 hidden bg-gradient-to-b dark:from-card dark:via-zinc-700/30 dark:to-card md:block"
        />
        <div className="flex flex-1 pt-4 md:border-t-0 md:pl-4 md:pt-0">
          <EditableTextArea
            value={variables?.description || event.description || ""}
            isPending={isPending}
            onSave={handleSaveDescription}
          >
            <h2 className="text-xl font-semibold">Description</h2>
          </EditableTextArea>
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
  const t = useI18n();
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
      {isPending && (
        <Loader className="mr-2 size-4 animate-spin text-primary" />
      )}

      <Select onValueChange={handleSelect} value={value}>
        <SelectTrigger className="w-auto px-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="participate">
            {t("eventDetails.participation.participate")}
          </SelectItem>
          <SelectItem value="maybe">
            {t("eventDetails.participation.maybe")}
          </SelectItem>
          <SelectItem value="leave">
            {t("eventDetails.participation.notGoing")}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
