"use client";

import { Button } from "@/components/ui/button";
import { joinGroup, leaveGroup } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";
import { RotateCw, UserRoundCheck, Users } from "lucide-react";
import { useResize, animated } from "@react-spring/web";
import { useRef } from "react";

interface JoinButtonProps {
  groupId: string;
  asJoined: boolean;
}

export default function JoinButton({ groupId, asJoined }: JoinButtonProps) {
  const container = useRef(null);
  const { width } = useResize({ container });

  const { mutate, isPending } = useMutation({
    mutationFn: asJoined ? leaveGroup : joinGroup,
  });

  const handleJoin = async () => {
    mutate(groupId);
  };

  const icon = asJoined ? (
    <UserRoundCheck className="mr-2 h-4 w-4" />
  ) : (
    <Users className="mr-2 h-4 w-4" />
  );

  return (
    <animated.div style={{ width, overflow: "hidden" }}>
      <Button
        className="p-0"
        onClick={handleJoin}
        variant="link"
        ref={container}
      >
        {isPending ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : icon}
        {asJoined ? "Joined" : "Join"}
      </Button>
    </animated.div>
  );
}
