"use client";

import { useMediaQuery } from "@/src/hooks/use-media-query";

export default function Desktop({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return children;

  return null;
}
