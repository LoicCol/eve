import React, { useState } from "react";
import { Check, Edit, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => Promise<void>;
}

export default function EditableText({
  value = "",
  onSave,
}: EditableTextProps) {
  const [newValue, setNewValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    await onSave(newValue);
    setIsLoading(false);
    setIsEditing(false);
  };

  return (
    <div className="editable-event-details">
      {isEditing ? (
        <div>
          <Input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <Button onClick={handleSaveClick} disabled={isLoading}>
            {isLoading ? <Loader /> : <Check />}
          </Button>
        </div>
      ) : (
        <div>
          <span>{details}</span>
          <Button onClick={handleEditClick}>
            <Edit />
          </Button>
        </div>
      )}
    </div>
  );
}
