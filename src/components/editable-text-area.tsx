"use client";

import React, { Suspense, useRef, useState } from "react";
import { Check, Pencil, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { MDXEditorMethods } from "@mdxeditor/editor";

const EditorComp = dynamic(() => import("./editor"), { ssr: false });

interface EditableTextAreaProps {
  value: string;
  onSave: (value: string) => void;
  isPending: boolean;
  children?: React.ReactNode;
}

export default function EditableTextArea({
  value = "",
  onSave,
  isPending,
  children,
}: EditableTextAreaProps) {
  const inputRef = useRef<MDXEditorMethods>(null);
  const [newValue, setNewValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    console.log("inputRef.current", inputRef.current);
  };

  const handleSaveClick = async () => {
    await onSave(newValue);
    setIsEditing(false);
  };

  const handleChange = (markdown: string) => {
    setNewValue(markdown);
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
      {!isEditing && !value && (
        <p className="mt-2 italic text-muted-foreground">
          No description provided
        </p>
      )}
      <Suspense fallback={null}>
        <EditorComp
          markdown={value}
          onChange={handleChange}
          readOnly={!isEditing}
          editorRef={inputRef}
        />
      </Suspense>
    </div>
  );
}
