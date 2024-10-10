"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogOverlay, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const close = (open: boolean) => {
    if (!open) {
      setOpen(false);
      setTimeout(() => {
        router.back();
      }, 300);
    }
  };

  useEffect(() => {
    if (pathname.includes("create") || pathname.includes("link-events")) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [pathname, setOpen]);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog defaultOpen open={open} onOpenChange={close}>
        <DialogOverlay className="bg-white/5">
          <DialogContent>{children}</DialogContent>
        </DialogOverlay>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={close}>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
