"use client";

import { ButtonProps } from "./ui/button";
import { Button } from "./ui/button";
import BorderTrail from "./border-trail";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface TrailedButtonProps extends ButtonProps {}

export function TrailedButton({ children, ...props }: TrailedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-fit rounded-md border border-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        className={cn(
          "bg-primary/10 text-primary transition-colors duration-300 hover:animate-none hover:bg-primary hover:text-white",
          props.className,
        )}
        {...props}
      >
        {children}
      </Button>
      <BorderTrail
        size={40}
        className={`bg-gradient-to-l from-green-200 via-green-500 to-green-200 dark:from-green-900 dark:via-green-300 dark:to-green-900 ${isHovered ? "hidden" : ""}`}
      />
    </div>
  );
}
