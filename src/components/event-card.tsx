"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EventCardDropdown from "./event-card-dropdown";
import ParticipantsList from "./participant-list";
import { getParticipants } from "@/server/queries";

interface EventCardProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    eventDate: Date;
  };
}

export default function EventCard({ event }: EventCardProps) {
  const participants = []; // await getParticipants(event.eventId);

  const serializedParticipants = participants.map(({ user, status }) => ({
    ...user,
    status,
  }));

  return (
    <Card className="relative rounded-xl transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:rounded-none hover:shadow-lg active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none">
      <CardHeader className="p-4">
        <CardTitle>{event.eventName}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-muted-foreground">{event.location}</p>
        <p className="pb-4 text-sm text-muted-foreground">
          {new Date(event.eventDate).toLocaleString()}
        </p>
        <EventCardDropdown eventId={event.eventId} />
        <ParticipantsList
          participants={serializedParticipants}
          iconSize="small"
        />
      </CardContent>
    </Card>
  );
}
