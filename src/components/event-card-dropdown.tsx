"use client";

import { EllipsisVertical, Loader } from "lucide-react";
import { MouseEvent } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { deleteEvent } from "@/lib/actions";

export default function EventCardDropdown({ eventId }: { eventId: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteEvent(eventId),
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
            <p>Delete</p>
            {isPending && (
              <Loader className="h-4 w-4 animate-spin text-primary" />
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
