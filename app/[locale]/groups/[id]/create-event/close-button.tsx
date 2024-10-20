"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface CloseButtonProps {
  groupId: string;
  locale: string;
}

export default function CloseButton({ groupId, locale }: CloseButtonProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push(`/${locale}/groups/${groupId}`);
  };

  return (
    <Button
      onClick={handleClose}
      variant="ghost"
      size="icon"
      className="absolute right-2 top-2"
    >
      <X className="h-4 w-4" />
    </Button>
  );
}
