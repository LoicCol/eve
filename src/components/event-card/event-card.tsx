"use client";

import { useI18n } from "@/locales/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EventCardDropdown from "./event-card-dropdown";
import ParticipantsList from "./participant-list";
import { getParticipants } from "server/queries";
import { useQuery } from "@tanstack/react-query";

interface EventCardProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    startDateTime: Date;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const t = useI18n();
  const { data: participants = [], isPending } = useQuery({
    queryKey: ["participants", event.eventId],
    queryFn: () => getParticipants(event.eventId),
  });

  const serializedParticipants = participants.map(({ user, status }) => ({
    ...user,
    status,
  }));

  return (
    <Card className="relative rounded-xl border-primary/50 transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:rounded-none hover:shadow-lg active:translate-x-0 active:translate-y-0 active:rounded-xl active:shadow-none">
      <CardHeader className="p-4">
        <CardTitle>{event.eventName}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-muted-foreground">{event.location}</p>

        <p className="pb-4 text-sm text-muted-foreground">
          {new Date(event.startDateTime).toLocaleDateString(t("locale"), {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        <EventCardDropdown eventId={event.eventId} />

        <ParticipantsList
          participants={serializedParticipants}
          iconSize="small"
          isPending={isPending}
        />
      </CardContent>
    </Card>
  );
}
