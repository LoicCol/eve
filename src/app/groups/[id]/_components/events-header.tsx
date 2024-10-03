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

export default function EventsHeader({ groupId }: { groupId: string }) {
  const [index, set] = useState(0);
  const pathname = usePathname();
  const isEventDetails = pathname.includes("events");

  const buttons: ((
    props: AnimatedProps<{ style: CSSProperties }>,
  ) => React.ReactElement)[] = [
    ({ style }) => (
      <animated.div className="flex gap-2" key="1" style={style}>
        <Button variant="outline">
          <Group className="mr-2 h-4 w-4" /> Link Events
        </Button>
        <Button asChild>
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
    <div className="mb-2 flex items-center justify-between px-2 pt-2">
      <Button variant="link" className="p-0" asChild>
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
