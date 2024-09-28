"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
    <Card className="transition-all rounded-xl ease-in-out duration-300 hover:rounded-md hover:translate-y-[-3px] hover:shadow-xl active:translate-x-[0px] active:translate-y-[0px] active:rounded-xl active:shadow-none">
      <CardHeader>
        <CardTitle>{event.eventName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{event.location}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(event.eventDate).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
}
