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
      className="absolute right-4 top-4 rounded-full md:hidden"
      onClick={() => setIsOpen(true)}
    >
      <Info className="size-5" />
    </Button>
  );
}
