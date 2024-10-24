"use client";

import { Dialog, DialogOverlay, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

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
    if (["create", "link", "edit"].some((path) => pathname?.includes(path))) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [pathname, setOpen]);

  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={close}>
        <DialogOverlay className="bg-white/5 backdrop-blur">
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
