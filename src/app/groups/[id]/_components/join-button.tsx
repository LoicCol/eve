"use client";

import { Button } from "@/components/ui/button";
import { joinGroup, leaveGroup } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";
import { RotateCw, UserRoundCheck, Users } from "lucide-react";
import { useResize, animated } from "@react-spring/web";
import { useRef } from "react";

interface JoinButtonProps {
  groupId: string;
  hasJoined: boolean;
}

export default function JoinButton({ groupId, hasJoined }: JoinButtonProps) {
  const container = useRef(null);
  const { width } = useResize({ container });

  const { mutate, isPending } = useMutation({
    mutationFn: hasJoined ? leaveGroup : joinGroup,
  });

  const handleJoin = async () => {
    mutate(groupId);
  };

  const icon = hasJoined ? (
    <UserRoundCheck className="mr-2 h-4 w-4" />
  ) : (
    <Users className="mr-2 h-4 w-4" />
  );

  return (
    <animated.div style={{ width, overflow: "hidden" }}>
      <Button
        className="flex items-center p-0"
        onClick={handleJoin}
        variant="link"
        ref={container}
      >
        {isPending ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : icon}
        {hasJoined ? "Joined" : "Join"}
      </Button>
    </animated.div>
  );
}
