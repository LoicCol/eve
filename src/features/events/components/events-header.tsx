"use client";

import { useI18n } from "@/locales/client";
import { ArrowLeft, Calendar, CalendarRange, Group } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { TrailedButton } from "@/components/motioned/trailed-button";

export default function EventsHeader({
  groupId,
}: {
  groupId: string;
  groupName?: string;
}) {
  const t = useI18n();
  const { eventId } = useParams();
  const router = useRouter();
  const isEventDetails = !!eventId;

  return (
    <div className="mb-1 flex items-center justify-end md:justify-between md:px-2 md:pt-2">
      {/* Desktop */}
      <Button variant="link" className={`hidden p-0 md:flex`} asChild>
        <Link href={`/groups/${groupId}/events`}>
          <CalendarRange className="mr-2 size-4" />
          <h2 className="">{t("eventsHeader.events")}</h2>
        </Link>
      </Button>

      {/* Mobile */}
      <Button
        variant="outline"
        size="icon"
        className={`absolute left-2 top-4 rounded-full p-0 md:hidden ${!isEventDetails && "hidden"}`}
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-4" />
      </Button>

      <ActionButtons
        isEventDetails={isEventDetails}
        groupId={groupId}
        eventId={eventId as string}
      />
    </div>
  );
}

function ActionButtons({
  isEventDetails,
  groupId,
  eventId,
}: {
  isEventDetails: boolean;
  groupId: string;
  eventId: string;
}) {
  const t = useI18n();

  if (!isEventDetails) {
    return (
      <div
        className={`flex w-full justify-between gap-2 md:justify-end md:py-0 ${
          isEventDetails ? "hidden md:flex" : ""
        }`}
      >
        <Button asChild variant="outline" className="">
          <Link href={`/groups/${groupId}/events/link`}>
            <Group className="mr-2 size-4" /> {t("eventsHeader.linkEvents")}
          </Link>
        </Button>
        <TrailedButton asChild>
          <Link href={`/groups/${groupId}/events/create`}>
            <Calendar className="mr-2 size-4" />
            {t("eventsHeader.createEvent")}
          </Link>
        </TrailedButton>
      </div>
    );
  }

  return (
    <div className="flex self-end">
      <TrailedButton asChild>
        <Link href={`/groups/${groupId}/events/${eventId}/edit`}>
          <Calendar className="mr-2 size-4" />
          {t("eventsHeader.editEvent")}
        </Link>
      </TrailedButton>
    </div>
  );
}
