"use client";

import { Button } from "@/components/ui/button";
import { joinGroup, leaveGroup } from "@/lib/actions";
import { useMutation } from "@tanstack/react-query";
import { RotateCw, UserRoundCheck, Users } from "lucide-react";

interface JoinButtonProps {
  groupId: string;
  asJoined: boolean;
}

export default function JoinButton({ groupId, asJoined }: JoinButtonProps) {
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
    <Button onClick={handleJoin} variant="link">
      {isPending ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : icon}
      {asJoined ? "Joined" : "Join"}
    </Button>
  );
}
