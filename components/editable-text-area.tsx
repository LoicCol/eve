"use client";

import React, { useState } from "react";
import { Check, Pencil, Loader } from "lucide-react";
import { Button } from "components/ui/button";
import { AutosizeTextarea } from "./autosize-textarea";

interface EditableTextareaProps {
  value: string;
  onSave: (value: string) => void;
  isPending: boolean;
  children?: React.ReactNode;
}

export default function EditableTextarea({
  value = "",
  onSave,
  isPending,
  children,
}: EditableTextareaProps) {
  const [newValue, setNewValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    await onSave(newValue);
    setIsEditing(false);
  };

  let icon = <Pencil className="h-4 w-4" />;
  if (isPending) {
    icon = <Loader className="h-4 w-4 animate-spin" />;
  } else if (isEditing) {
    icon = <Check className="h-4 w-4" />;
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="flex items-center">
        {children}
        <Button
          className="ml-4 p-0 text-muted-foreground/50 after:bg-primary hover:text-primary"
          variant="link"
          onClick={isEditing ? handleSaveClick : handleEditClick}
        >
          {icon}
        </Button>
      </div>
      {!isEditing && (
        <div className="flex-1 overflow-auto">
          <p
            className={`whitespace-pre-line ${!value && "italic text-muted-foreground"}`}
          >
            {value || "No description provided"}
          </p>
        </div>
      )}
      {isEditing && (
        <AutosizeTextarea
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          autoFocus
          className="flex-1 resize-none focus-visible:border-primary"
        />
      )}
    </div>
  );
}
