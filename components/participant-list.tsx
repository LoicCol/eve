import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar";
import { CheckIcon, HelpCircleIcon } from "lucide-react";
import { TooltipPortal } from "@radix-ui/react-tooltip";
import { Skeleton } from "./ui/skeleton";

interface ParticipantsListProps {
  participants: {
    userId?: string;
    name?: string;
    image?: string | null;
    status: "participate" | "maybe";
  }[];
  iconSize?: string;
  isPending?: boolean;
}

export default function ParticipantsList({
  participants,
  iconSize,
  isPending,
}: ParticipantsListProps) {
  const iconSizeClass = iconSize === "small" ? "h-7 w-7" : "h-10 w-10";
  const indicatorSizeClass = iconSize === "small" ? "h-3 w-3" : "h-4 w-4";

  if (isPending) {
    return (
      <div className="flex gap-2">
        <Skeleton className="h-7 w-7 rounded-full" />
        <Skeleton className="h-7 w-7 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        {participants.map((participant) => (
          <Tooltip key={participant.userId}>
            <TooltipTrigger>
              <div className="relative">
                <Avatar className={`${iconSizeClass} border-2 border-white`}>
                  <AvatarImage src={participant.image || ""} />
                  <AvatarFallback>{participant.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {participant.status === "participate" ? (
                  <CheckIcon
                    className={`absolute -bottom-1 -right-1 ${indicatorSizeClass} rounded-full bg-white text-green-500`}
                  />
                ) : (
                  <HelpCircleIcon
                    className={`absolute -bottom-1 -right-1 ${indicatorSizeClass} rounded-full bg-white text-orange-500`}
                  />
                )}
              </div>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                side="bottom"
                className={
                  participant.status === "participate"
                    ? "bg-green-500"
                    : "bg-orange-500"
                }
              >
                <p className="font-semibold text-white">{participant.name}</p>
                <p className="text-xs text-white">
                  {participant.status === "participate"
                    ? "Participating"
                    : "Maybe"}
                </p>
              </TooltipContent>
            </TooltipPortal>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
