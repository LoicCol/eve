"use client";

import React, { useRef, useState } from "react";
import { Check, Pencil, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

interface EditableTextAreaProps {
  value: string;
  onSave: (value: string) => void;
  isPending: boolean;
  children?: React.ReactNode;
}

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

export default function EditableTextArea({
  value = "",
  onSave,
  isPending,
  children,
}: EditableTextAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [newValue, setNewValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [editor] = useState(() => withReact(createEditor()));

  const handleEditClick = () => {
    setIsEditing(true);
    inputRef.current?.focus();
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
    <div>
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
      <Slate editor={editor} initialValue={initialValue}>
        <Editable readOnly={!isEditing} autoFocus />
      </Slate>
    </div>
  );
}
