"use client";

import { Card, CardContent } from "@/components/ui/card";
import ParticipantsList from "@/components/participant-list";
import { CalendarIcon, MapPinIcon, UserIcon, ClockIcon } from "lucide-react";
import { useI18n } from "@/locales/client";
import { Separator } from "@/components/ui/separator";
import { isValid } from "date-fns";
import { ParticipationButton } from "./participation-button";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import EventDescription from "./event-description";

interface EventDetailsProps {
  event: {
    eventId: string;
    eventName: string;
    location: string;
    startDate: Date;
    endDate: Date | null;
    startTime: string | null;
    endTime: string | null;
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
  const { locale } = useParams();
  const currentUserParticipation = participants.find(
    (participant) => participant.userId === user?.userId,
  );

  function formatSafeDate(date: Date | null | undefined): string {
    if (date && isValid(date)) {
      return new Date(date).toLocaleDateString(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
    return "-";
  }

  function formatSafeTime(time: string | null | undefined): string {
    if (time) {
      return new Date(time).toLocaleDateString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "-";
  }

  return (
    <Card className="flex-1 overflow-hidden border-none shadow-none md:m-2">
      <CardContent className="flex h-full flex-col gap-4 p-4 md:flex-row">
        <div className="flex flex-1 flex-col gap-5">
          <h1 className="text-xl font-bold">{event.eventName}</h1>

          <ParticipationButton
            eventId={event.eventId}
            currentUserParticipation={currentUserParticipation}
          />

          <div className="grid grid-cols-2 gap-2 gap-x-4">
            <InformationItem
              icon={<CalendarIcon className="mr-2 size-5" />}
              label={t("eventDetails.startDate")}
              value={formatSafeDate(event.startDate)}
            />

            <InformationItem
              icon={<CalendarIcon className="mr-2 size-5" />}
              label={t("eventDetails.endDate")}
              value={formatSafeDate(event.endDate)}
            />

            <div className="flex items-center">
              <ClockIcon className="mr-2 size-5" />
              <span>{formatSafeTime(event.startTime)}</span>
            </div>

            <div className="flex items-center">
              <ClockIcon className="mr-2 size-5" />
              <span>{formatSafeTime(event.endTime)}</span>
            </div>
          </div>

          <InformationItem
            icon={<MapPinIcon className="mr-2 size-5" />}
            label={t("eventDetails.location")}
            value={event.location}
          />

          <InformationItem
            icon={<UserIcon className="mr-2 size-5" />}
            label={t("eventDetails.createdBy")}
            value={creator?.name || ""}
          />

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">
              {t("eventDetails.participants")}
            </h2>
            <ParticipantsList participants={participants} />
          </div>
        </div>
        <Separator
          orientation="vertical"
          className="ml-2 hidden bg-gradient-to-b dark:from-card dark:via-zinc-700/30 dark:to-card md:block"
        />
        <EventDescription event={event} />
      </CardContent>
    </Card>
  );
}

function InformationItem({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center">
        {icon}
        <span>{value}</span>
      </div>
    </div>
  );
}
