"use server";

import EventCard from "@/components/event-card";
import Link from "next/link";
import { encode } from "@/util/shorten-uuid";
import { getEvents } from "server/queries";
import { auth } from "@clerk/nextjs/server";
import { getI18n } from "@/locales/server";
import { Separator } from "@/components/ui/separator";

export default async function EventList() {
  const { userId } = auth();
  const events = await getEvents(userId || "");
  const now = new Date();
  const t = await getI18n();

  const upcomingEvents = events.filter(
    (event) => new Date(event.eventDate) >= now,
  );
  const pastEvents = events.filter((event) => new Date(event.eventDate) < now);

  return (
    <div className="py-8">
      {events.length === 0 ? (
        <p className="text-muted-foreground">{t("eventList.noEvents")}</p>
      ) : (
        <>
          <h2 className="d mb-4 px-4 text-xl font-bold text-primary">
            {t("eventList.upcomingEvents")}
          </h2>

          <Separator className="mx-4 mb-6 w-auto" />

          <div className="mb-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.eventId}
                href={`/groups/${encode(event.groupId ?? "")}/events/${encode(event.eventId ?? "")}`}
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>

          <h2 className="mb-4 px-4 text-xl font-bold text-primary">
            {t("eventList.pastEvents")}
          </h2>

          <Separator className="mx-4 mb-6 w-auto" />

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Link
                key={event.eventId}
                href={`/groups/${encode(event.groupId ?? "")}/events/${encode(event.eventId ?? "")}`}
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
