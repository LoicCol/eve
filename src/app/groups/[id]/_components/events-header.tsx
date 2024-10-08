"use client";

import { Calendar, CalendarRange, Group, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  animated,
  AnimatedProps,
  useSpringRef,
  useTransition,
} from "@react-spring/web";
import { CSSProperties, useEffect, useState } from "react";
import GroupDetailsName from "./group-details-name";
import React from "react";
import { SheetHeader, SheetTrigger } from "@/components/ui/sheet";

export default function EventsHeader({
  groupId,
  groupName,
}: {
  groupId: string;
  groupName?: string;
}) {
  const [index, set] = useState(0);
  const pathname = usePathname();
  const isEventDetails = pathname.includes("events");

  const buttons: ((
    props: AnimatedProps<{ style: CSSProperties }>,
  ) => React.ReactElement)[] = [
    ({ style }) => (
      <animated.div className="gap-2 md:flex" key="1" style={style}>
        <Button variant="link">
          <Group className="mr-2 h-4 w-4" /> Link Events
        </Button>
        <Button variant="link" asChild>
          <Link href={`/groups/${groupId}/create-event`}>
            <Calendar className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </animated.div>
    ),
    ({ style }) => <animated.div key="2" style={style} />,
  ];

  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    transRef.start();
  }, [index, transRef]);

  useEffect(() => {
    if (!isEventDetails) return set(0);
    set(1);
  }, [isEventDetails]);

  return (
    <div className="mb-2 flex items-center justify-between pl-6 pr-2 pt-2">
      <Button variant="link" className="hidden p-0 md:block" asChild>
        <Link href={`/groups/${groupId}`}>
          <CalendarRange className="mr-2 h-4 w-4" />
          <h2 className="">Events</h2>
        </Link>
      </Button>

      {transitions((style, index) => {
        const AnimatedButton = buttons[index];
        if (!AnimatedButton) return null;
        return <AnimatedButton style={style} />;
      })}
    </div>
  );
}
