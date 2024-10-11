"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EventCardDropdown from "./event-card-dropdown";

interface EventCardProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    eventDate: Date;
  };
}

export default async function EventCard({ event }: EventCardProps) {
  return (
    <Card className="relative rounded-xl transition-all duration-300 ease-in-out hover:translate-y-[-3px] hover:rounded-none hover:shadow-lg active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none">
      <CardHeader className="p-4">
        <CardTitle>{event.eventName}</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <p className="text-sm text-muted-foreground">{event.location}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(event.eventDate).toLocaleString()}
        </p>
        <EventCardDropdown eventId={event.eventId} />
      </CardContent>
    </Card>
  );
}
