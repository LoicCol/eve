"use server";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

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
    <Link href={`/events/${event.eventId}`}>
      <Card className="transition-shadow ease-in-out duration-300 hover:shadow-xl">
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
    </Link>
  );
}
