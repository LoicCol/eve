"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CloseButton() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/groups/all");
  };

  return (
    <Button
      onClick={handleClose}
      variant="ghost"
      size="icon"
      className="absolute right-2 top-2"
    >
      <X className="size-4" />
    </Button>
  );
}
