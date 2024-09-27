"use client";

import { Button } from "@/components/ui/button";
import { joinGroup, leaveGroup } from "@/lib/actions";
import { UserRoundCheck, Users } from "lucide-react";

interface JoinButtonProps {
  groupId: string;
  asJoined: boolean;
}

export default function JoinButton({ groupId, asJoined }: JoinButtonProps) {
  const handleJoin = async () => {
    if (!asJoined) await joinGroup(groupId);
    else await leaveGroup(groupId);
  };

  return (
    <Button onClick={handleJoin} variant="link">
      {asJoined ? (
        <>
          <UserRoundCheck className="mr-2 h-4 w-4" /> Leave
        </>
      ) : (
        <>
          <Users className="mr-2 h-4 w-4" /> Join
        </>
      )}
    </Button>
  );
}
