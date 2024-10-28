"use client";

import { joinEvent, leaveEvent } from "../server/events.actions";
import { Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useI18n } from "@/locales/client";

export function ParticipationButton({
  eventId,
  currentUserParticipation,
}: {
  eventId: string;
  currentUserParticipation?: {
    status: "participate" | "maybe";
  };
}) {
  const t = useI18n();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ status }: { status: string }) => {
      if (status === "participate") {
        return joinEvent(eventId, "participate");
      }

      if (status === "maybe") {
        return joinEvent(eventId, "maybe");
      }

      return leaveEvent(eventId);
    },
  });

  const handleSelect = (value: string) => {
    mutate({ status: value });
  };

  const value = currentUserParticipation?.status || "leave";

  return (
    <div className="flex items-center">
      <Select onValueChange={handleSelect} value={value}>
        <SelectTrigger className="w-auto">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="participate">
            {t("eventDetails.participation.participate")}
          </SelectItem>
          <SelectItem value="maybe">
            {t("eventDetails.participation.maybe")}
          </SelectItem>
          <SelectItem value="leave">
            {t("eventDetails.participation.notGoing")}
          </SelectItem>
        </SelectContent>
      </Select>

      {isPending && (
        <Loader className="ml-2 size-4 animate-spin text-primary" />
      )}
    </div>
  );
}
