import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "lg" | "xl" | "2xl" | "7xl";
  as?: "div" | "section" | "main" | "header" | "footer";
}

const sizeClasses = {
  lg: "max-w-5xl",
  xl: "max-w-6xl",
  "2xl": "max-w-7xl",
  "7xl": "max-w-[84rem]",
} as const;

export function Container({
  children,
  className,
  size = "2xl",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
      {children}
    </Tag>
  );
}
