"use client";

import { Button } from "@/components/ui/button";
import { useGroupDetailsSidebar } from "@/util/group-details-sidebar";
import { Info } from "lucide-react";

export default function GroupDetailsSidebarTrigger() {
  const { setIsOpen } = useGroupDetailsSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={() => setIsOpen(true)}
    >
      <Info className="size-5" />
    </Button>
  );
}
