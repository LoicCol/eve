"use client";

import { useMediaQuery } from "@/src/hooks/use-media-query";

export default function Mobile({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return null;

  return children;
}
