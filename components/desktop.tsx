"use client";

import { useMediaQuery } from "hooks/use-media-query";

export default function Desktop({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) return children;

  return null;
}
