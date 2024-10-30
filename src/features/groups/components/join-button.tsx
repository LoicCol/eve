"use client";

import { Button } from "@/components/ui/button";
import { Loader, UserRoundCheck, Users } from "lucide-react";
import { useResize, animated } from "@react-spring/web";
import { useRef } from "react";
import { useI18n } from "@/locales/client";
import { useJoinGroup } from "../hooks/use-join-group";

interface JoinButtonProps {
  groupId: string;
  hasJoined: boolean;
}

export default function JoinButton({ groupId, hasJoined }: JoinButtonProps) {
  const container = useRef(null);
  const { width } = useResize({ container });
  const t = useI18n();

  const { handleJoin, isPending } = useJoinGroup({ hasJoined, groupId });

  const icon = hasJoined ? (
    <UserRoundCheck className="mr-2 size-4" />
  ) : (
    <Users className="mr-2 size-4" />
  );

  return (
    <>
      <animated.div style={{ width, overflow: "hidden" }} className="shrink-0">
        <Button
          className="flex items-center p-0"
          onClick={handleJoin}
          variant="link"
          ref={container}
        >
          {isPending ? <Loader className="mr-2 size-4 animate-spin" /> : icon}
          {hasJoined ? t("joinButton.joined") : t("joinButton.join")}
        </Button>
      </animated.div>
    </>
  );
}
