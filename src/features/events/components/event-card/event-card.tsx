"use client";

import { useI18n } from "@/locales/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import EventCardDropdown from "./event-card-dropdown";
import ParticipantsList from "../participant-list";
import { getParticipants } from "../../server/queries/events";
import { useQuery } from "@tanstack/react-query";
import { formatSafeDate, formatSafeTime } from "@/util/date-time-format";
import { useParams } from "next/navigation";
import { MapPinIcon } from "lucide-react";

type Event = {
  eventId: string;
  eventName: string;
  location: string;
  startDate: Date;
  endDate: Date | null;
  startTime: string | null;
  endTime: string | null;
};

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
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
      <CardContent className="flex flex-col gap-2 px-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPinIcon className="mr-2 size-4" />
          <p>{event.location}</p>
        </div>

        <WhenComponent
          startDate={event.startDate}
          endDate={event.endDate}
          startTime={event.startTime}
          endTime={event.endTime}
        />

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

function WhenComponent({
  startDate,
  endDate,
  startTime,
  endTime,
}: Pick<Event, "startDate" | "endDate" | "startTime" | "endTime">) {
  const t = useI18n();
  const { locale } = useParams();

  return (
    <div className="flex flex-col pb-1 lg:flex-row lg:gap-2">
      <p className="text-sm text-muted-foreground">
        {t("eventCard.from")}{" "}
        <span className="text-primary">
          {formatSafeDate(startDate, locale as string)}
          {startTime ? ` - ${formatSafeTime(startTime, startDate)}` : null}
        </span>
      </p>

      {endDate ? (
        <p className="text-sm text-muted-foreground">
          {t("eventCard.to")}{" "}
          <span className="text-primary">
            {formatSafeDate(endDate, locale as string)}
            {endTime ? ` - ${formatSafeTime(endTime, endDate)}` : null}
          </span>
        </p>
      ) : null}
    </div>
  );
}
