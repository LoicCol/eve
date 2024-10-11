"use client";

import { Calendar, CalendarRange, Group } from "lucide-react";
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
import React from "react";

export default function EventsHeader({
  groupId,
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
      <animated.div
        className={`justify-between gap-2 md:flex ${isEventDetails ? "hidden" : "flex"}`}
        key="1"
        style={style}
      >
        <Button asChild variant="outline" className="">
          <Link href={`/groups/${groupId}/link-events`}>
            <Group className="mr-2 h-4 w-4" /> Link Events
          </Link>
        </Button>
        <Button asChild className="">
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
    <div
      className={`mb-2 items-center justify-between md:flex md:pl-2 md:pr-2 md:pt-2 ${!isEventDetails && "pt-2"}`}
    >
      {/* Desktop */}
      <Button variant="link" className={`hidden p-0 md:flex`} asChild>
        <Link href={`/groups/${groupId}`}>
          <CalendarRange className="mr-2 h-4 w-4" />
          <h2 className="">Events</h2>
        </Link>
      </Button>

      {/* Mobile */}
      <Button
        variant="link"
        className={`p-0 md:hidden ${!isEventDetails && "hidden"}`}
        asChild
      >
        <Link href={`/groups/${groupId}`}>
          <CalendarRange className="mr-2 h-4 w-4" />
          <h2 className="">Group&apos;s Events</h2>
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
