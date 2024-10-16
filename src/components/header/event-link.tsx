"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BreadcrumbSeparator } from "../ui/breadcrumb";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getEventName } from "@/lib/actions";
import { decode } from "@/util/shorten-uuid";
import { Loader } from "lucide-react";
import { Fragment, useRef } from "react";
import { useResize } from "@react-spring/web";
import BreadcrumbItem from "./animated-breadcrumb-item";

export default function EventLink() {
  const eventContainer = useRef(null);
  const eventStyle = useResize({ container: eventContainer });

  const params = useParams<{ id: string; eventId: string }>();
  const groupId = params?.id ?? "";
  const eventId = params?.eventId ?? "";

  const { data: eventName = "", isPending: isPendingEvent } = useQuery({
    queryFn: () => getEventName(decode(eventId)),
    queryKey: ["event", eventId],
    enabled: Boolean(eventId),
  });

  return (
    <Fragment>
      {eventId && <BreadcrumbSeparator />}

      <BreadcrumbItem
        style={{
          width: eventId ? eventStyle.width : 0,
          overflow: "hidden",
        }}
      >
        <div ref={eventContainer} className="flex items-center gap-2">
          <Loader
            className={`mr-2 h-4 w-4 animate-spin ${!isPendingEvent && "hidden"}`}
          />

          <Button
            variant="link"
            className={`p-0 text-foreground after:bg-primary hover:text-primary ${isPendingEvent ? "opacity-0" : "opacity-100"}`}
            asChild
          >
            <Link href={`/groups/${groupId}/events/${eventId}`}>
              {eventName}
            </Link>
          </Button>
        </div>
      </BreadcrumbItem>
    </Fragment>
  );
}
