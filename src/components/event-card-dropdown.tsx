"use client";

import { useI18n } from "@/locales/client";
import { EllipsisVertical, Loader } from "lucide-react";
import { MouseEvent } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "server/actions/actions";
import { toast } from "sonner";

export default function EventCardDropdown({ eventId }: { eventId: string }) {
  const t = useI18n();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteEvent(eventId),
    onError: () => {
      toast.error(t("eventCardDropdown.deleteError"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const handleDelete = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="absolute right-2 top-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="mt-0 rounded-full border-none text-muted-foreground"
          >
            <EllipsisVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={handleDelete}
            className="flex justify-between"
          >
            <p>{t("eventCardDropdown.delete")}</p>
            {isPending && (
              <Loader className="h-4 w-4 animate-spin text-primary" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
