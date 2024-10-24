"use client";

import { useIsMobile } from "@/hooks/use-mobile";

export function Mobile({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return isMobile ? children : null;
}

export function Desktop({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  return isMobile ? null : children;
}
