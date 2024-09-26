import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckIcon, HelpCircleIcon } from "lucide-react";

interface ParticipantsListProps {
  participants: {
    userId?: string;
    name?: string;
    image?: string | null;
    status: "participate" | "maybe";
  }[];
}

export default function ParticipantsList({
  participants,
}: ParticipantsListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <TooltipProvider>
        {participants.map((participant) => (
          <Tooltip key={participant.userId}>
            <TooltipTrigger>
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white">
                  <AvatarImage src={participant.image || ""} />
                  <AvatarFallback>{participant.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                {participant.status === "participate" ? (
                  <CheckIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-green-500 bg-white rounded-full" />
                ) : (
                  <HelpCircleIcon className="absolute -bottom-1 -right-1 h-4 w-4 text-orange-500 bg-white rounded-full" />
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              className={
                participant.status === "participate"
                  ? "bg-green-500"
                  : "bg-orange-500"
              }
            >
              <p className="text-white font-semibold">{participant.name}</p>
              <p className="text-white text-xs">
                {participant.status === "participate"
                  ? "Participating"
                  : "Maybe"}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
}
