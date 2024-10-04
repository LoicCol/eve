"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Dialog, DialogOverlay, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { Drawer, DrawerContent } from "./ui/drawer";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleOpenChange = () => {
    router.back();
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog defaultOpen open onOpenChange={handleOpenChange}>
        <DialogOverlay className="bg-white/5">
          <DialogContent>{children}</DialogContent>
        </DialogOverlay>
      </Dialog>
    );
  }

  return (
    <Drawer open onOpenChange={handleOpenChange}>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}
