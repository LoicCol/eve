"use client";

import { useMediaQuery } from "@/hooks/use-media-query";

export default function Mobile({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return null;

  return children;
}
