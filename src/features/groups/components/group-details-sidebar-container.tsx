"use client";

import { Drawer } from "vaul";
import { useGroupDetailsSidebar } from "@/util/group-details-sidebar";

export default function GroupDetailsSidebarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen } = useGroupDetailsSidebar();

  return (
    <Drawer.Root open={isOpen} onOpenChange={setIsOpen} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="fixed bottom-2 right-2 top-2 z-10 flex w-3/4 outline-none"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          {children}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
