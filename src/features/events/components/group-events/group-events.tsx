"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getGroupEvents } from "../../server/events.actions";
import { matchQueryStatus } from "@/util/matchQueryStatus";
import { MomentFilter, DisplayToggle } from "./group-events-display-options";
import EventsLoader from "./group-events-loader";
import EventsList from "./group-events-list";
import EventsErrored from "./group-events-errored";
import EventsEmpty from "./group-events-empty";
import { Separator } from "@/components/ui/separator";

export default function GroupEvents({ groupId }: { groupId: string }) {
  const [momentFilter, setMomentFilter] = useState<"upcoming" | "past">(
    "upcoming",
  );
  const [display, setDisplay] = useState<"grouped" | "sorted">("grouped");

  const eventsQuery = useQuery({
    queryKey: ["events", groupId, momentFilter],
    queryFn: () => getGroupEvents(groupId, momentFilter),
  });

  return (
    <div className="flex flex-1 flex-col overflow-auto md:px-2">
      <div className="flex gap-4 pb-4">
        <MomentFilter
          value={momentFilter}
          onValueChange={(value) => setMomentFilter(value)}
        />
        <Separator orientation="vertical" />
        <DisplayToggle
          value={display}
          onValueChange={(value) => setDisplay(value)}
        />
      </div>

      {matchQueryStatus(eventsQuery, {
        Loading: <EventsLoader display={display} />,
        Errored: <EventsErrored />,
        Success: ({ data }) => (
          <EventsList events={data} groupId={groupId} display={display} />
        ),
        Empty: <EventsEmpty />,
      })}
    </div>
  );
}
