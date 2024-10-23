"use client";

import { ButtonProps } from "../ui/button";
import { Button } from "../ui/button";
import BorderTrail from "./border-trail";
import { useState } from "react";

interface TrailedButtonProps extends ButtonProps {}

export function TrailedButton({ children, ...props }: TrailedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-fit overflow-hidden rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        className="bg-primary/10 text-primary transition-colors duration-300 hover:animate-none hover:bg-primary hover:text-white"
        {...props}
      >
        {children}
      </Button>
      <BorderTrail
        size={40}
        className={`bg-gradient-to-l from-border via-primary to-border dark:from-border dark:via-primary dark:to-border ${isHovered ? "hidden" : ""}`}
      />
    </div>
  );
}
