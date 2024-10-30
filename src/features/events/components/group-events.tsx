"use client";

import { useI18n } from "@/locales/client";
import EventCard from "@/features/events/components/event-card/event-card";
import Link from "next/link";
import { encode } from "@/util/shorten-uuid";
import { AnimatedGroup } from "@/components/motioned/animated-group";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGroupEvents } from "../server/events.actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function GroupEvents({ groupId }: { groupId: string }) {
  const t = useI18n();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const { data: events = [], isPending } = useQuery({
    queryKey: ["events", groupId, activeTab],
    queryFn: () => getGroupEvents(groupId, activeTab),
  });

  const renderEventList = (eventList: typeof events) => {
    const groupedEvents = eventList.reduce(
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

    if (sortedSections.includes("other")) {
      sortedSections = sortedSections.filter((section) => section !== "other");
      sortedSections.push("other");
    }

    return sortedSections.map((sectionId) => (
      <div key={sectionId}>
        <h2 className="mb-4 font-sans text-xl font-bold delay-100 animate-in">
          {sectionId === "other"
            ? "-"
            : groupedEvents[sectionId]?.[0]?.sectionName}
        </h2>
        <AnimatedGroup className="grid gap-4 md:grid-cols-2" preset="blur">
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
    ));
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as "upcoming" | "past")}
      className="flex flex-1 flex-col overflow-auto md:px-2"
    >
      <TabsList className="flex h-auto grid-cols-2 justify-start gap-2 border-none bg-transparent p-0">
        <TabsTrigger
          className="rounded-[.375rem] bg-card-foreground/5 p-0 px-2 py-1 text-sm font-medium text-muted-foreground/80 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
          value="upcoming"
        >
          {t("groupEvents.upcoming")}
        </TabsTrigger>
        <TabsTrigger
          className="rounded-[.375rem] bg-card-foreground/5 p-0 px-2 py-1 text-sm font-medium text-muted-foreground/80 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-sm"
          value="past"
        >
          {t("groupEvents.past")}
        </TabsTrigger>
      </TabsList>

      <TabsContent className="mt-4 space-y-4" value="upcoming">
        {isPending ? (
          <div className="space-y-8 pt-2 md:p-2">
            <Skeleton className="h-4 w-[80px]" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-[162px] w-full rounded-xl" />
              <Skeleton className="h-[162px] w-full rounded-xl" />
            </div>
          </div>
        ) : events.length > 0 ? (
          renderEventList(events)
        ) : (
          <p className="p-2 text-muted-foreground">
            {t("groupEvents.noEventsFound")}
          </p>
        )}
      </TabsContent>
      <TabsContent value="past" className="mt-4 space-y-4">
        {isPending ? (
          <div className="space-y-8 pt-2 md:p-2">
            <Skeleton className="h-4 w-[80px]" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Skeleton className="h-[162px] w-full rounded-xl" />
              <Skeleton className="h-[162px] w-full rounded-xl" />
            </div>
          </div>
        ) : events.length > 0 ? (
          renderEventList(events)
        ) : (
          <p className="p-2 text-muted-foreground">
            {t("groupEvents.noEventsFound")}
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}
