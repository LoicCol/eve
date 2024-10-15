"use client";

import { Ellipsis, Loader } from "lucide-react";
import { MouseEvent } from "react";

import { useMutation } from "@tanstack/react-query";
import { deleteGroup } from "@/lib/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function GroupRowDropdown({ groupId }: { groupId: string }) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteGroup(groupId),
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
            <Ellipsis className="h-4 w-4" />
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
