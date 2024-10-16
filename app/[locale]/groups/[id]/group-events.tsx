"use client";

import { useI18n } from "@/locales/client";
import EventCard from "@/components/event-card";
import Link from "next/link";
import { encode } from "@/util/shorten-uuid";
import { AnimatedGroup } from "@/components/animated-group";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGroupEvents } from "@/lib/actions";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function GroupEvents({ groupId }: { groupId: string }) {
  const t = useI18n();
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  const { data: events = [], isPending } = useQuery({
    queryKey: ["events", groupId, filter],
    queryFn: () => getGroupEvents(groupId, filter),
  });

  const handleSelect = (value: "upcoming" | "past") => {
    setFilter(value);
  };

  const groupedEvents = events.reduce(
    (acc, event) => {
      const sectionId = event.sectionId || "other";
      if (!acc[sectionId]) {
        acc[sectionId] = [];
      }
      acc[sectionId].push(event);
      return acc;
    },
    {} as { [key: string]: typeof events },
  );

  let sortedSections = Object.keys(groupedEvents);

  // Move "other" section to the end if it exists
  if (sortedSections.includes("other")) {
    sortedSections = sortedSections.filter((section) => section !== "other");
    sortedSections.push("other");
  }

  return (
    <div className="flex flex-col gap-2 overflow-auto">
      <Select onValueChange={handleSelect} value={filter}>
        <SelectTrigger className="m-[1px] w-fit overflow-visible p-2">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="upcoming">{t("groupEvents.upcoming")}</SelectItem>
          <SelectItem value="past">{t("groupEvents.past")}</SelectItem>
        </SelectContent>
      </Select>

      {isPending ? (
        <div className="space-y-8 pt-2 md:p-2">
          <Skeleton className="h-4 w-[80px]" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-[162px] w-full rounded-xl" />
            <Skeleton className="h-[162px] w-full rounded-xl" />
          </div>
        </div>
      ) : null}

      {!isPending && events.length > 0 ? (
        <div className="space-y-8 overflow-auto pt-2 md:p-2">
          {sortedSections.map((sectionId) => (
            <div key={sectionId}>
              <h2 className="mb-4 text-xl font-bold delay-100 animate-in">
                {sectionId === "other"
                  ? "Other"
                  : groupedEvents[sectionId]?.[0]?.sectionName}
              </h2>
              <AnimatedGroup
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                preset="blur"
              >
                {groupedEvents[sectionId]?.map((event) => (
                  <Link
                    href={`/groups/${encode(groupId)}/events/${encode(event.eventId)}`}
                    key={event.eventId}
                  >
                    <EventCard event={event} />
                  </Link>
                ))}
              </AnimatedGroup>
            </div>
          ))}
        </div>
      ) : null}

      {!isPending && events.length === 0 ? (
        <p className="p-2 px-6 italic text-muted-foreground">
          {t("groupEvents.noEventsFound")}
        </p>
      ) : null}
    </div>
  );
}
