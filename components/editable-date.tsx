"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Check, Pencil, Loader, CalendarIcon } from "lucide-react";
import { Button } from "components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "lib/utils";

interface EditableDateProps {
  value: Date;
  onSave: (value: Date) => void;
  isPending: boolean;
  children?: React.ReactNode;
}

export default function EditableDate({
  value,
  onSave,
  isPending,
  children,
}: EditableDateProps) {
  const [date, setDate] = useState<Date | undefined>(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (!date) return;
    await onSave(date);
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="flex">
      <Popover defaultOpen>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          onKeyDown={(e) => {
            if (date && e.key === "Enter") {
              handleSaveClick();
            }
          }}
        >
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Button
        className="ml-4 p-0"
        variant="link"
        onClick={handleSaveClick}
        disabled={isPending || !date}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <div className="flex items-center">
      {children}
      <Button
        className="ml-4 p-0 text-muted-foreground/50 after:bg-primary hover:text-primary"
        variant="link"
        onClick={handleEditClick}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}
