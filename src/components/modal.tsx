"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogOverlay, DialogContent } from "./ui/dialog";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, DrawerContent } from "./ui/drawer";
import { useEffect, useState } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname.includes("create")) {
      setOpen(false);
    }
  }, [pathname]);

  const handleOpenChange = () => {
    router.back();
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog defaultOpen open={open} onOpenChange={handleOpenChange}>
        <DialogOverlay className="bg-white/5">
          <DialogContent>{children}</DialogContent>
        </DialogOverlay>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
