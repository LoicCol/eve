"use client";

import React, { useRef, useState } from "react";
import { Check, Pencil, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  isPending: boolean;
  children?: React.ReactNode;
}

export default function EditableText({
  value = "",
  onSave,
  isPending,
  children,
}: EditableTextProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newValue, setNewValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    inputRef.current?.focus();
  };

  const handleSaveClick = async () => {
    await onSave(newValue);
    setIsEditing(false);
  };

  return isEditing ? (
    <div className="flex">
      <Input
        type="text"
        value={newValue}
        onChange={(e) => setNewValue(e.target.value)}
        ref={inputRef}
        autoFocus
        required
        onKeyDown={(e) => {
          if (value && e.key === "Enter") {
            handleSaveClick();
          }
        }}
      />
      <Button
        className="ml-4 p-0"
        variant="link"
        onClick={handleSaveClick}
        disabled={isPending || !newValue}
      >
        {isPending ? (
          <Loader className="h-4 w-4" />
        ) : (
          <Check className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <div className="flex items-center">
      {children}
      <Button
        className="ml-4 p-0 text-foreground after:bg-primary hover:text-primary"
        variant="link"
        onClick={handleEditClick}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}
