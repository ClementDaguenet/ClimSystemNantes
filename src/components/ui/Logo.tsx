import Image from "next/image";
import {
  LOGO_WHITE_SRC,
  OFFICIAL_LOGO_ASPECT,
  OFFICIAL_LOGO_SRC,
} from "@/lib/assets";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  variant?: "default" | "white";
  height?: number;
  priority?: boolean;
}

export function Logo({
  className,
  variant = "default",
  height = 48,
  priority = false,
}: LogoProps) {
  const h = height;
  const w = Math.round(h * OFFICIAL_LOGO_ASPECT);
  const src = variant === "white" ? LOGO_WHITE_SRC : OFFICIAL_LOGO_SRC;

  return (
    <Image
      src={src}
      alt="Climsystem Distribution Atlantique"
      width={w}
      height={h}
      priority={priority}
      sizes="(max-width: 768px) 220px, 280px"
      className={cn("h-auto w-auto object-contain", className)}
      style={{ height: h, width: "auto", maxWidth: "100%" }}
    />
  );
}
