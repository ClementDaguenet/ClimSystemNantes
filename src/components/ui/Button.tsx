import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed will-change-transform";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-clim-red-500 text-white hover:bg-clim-red-600 shadow-[0_4px_14px_-2px_rgba(225,29,46,0.45)] hover:shadow-[0_6px_20px_-2px_rgba(225,29,46,0.55)] hover:-translate-y-0.5",
  secondary:
    "bg-clim-blue-500 text-white hover:bg-clim-blue-600 shadow-[0_4px_14px_-2px_rgba(30,111,217,0.4)] hover:-translate-y-0.5",
  outline:
    "border-2 border-clim-blue-500 text-clim-blue-700 hover:bg-clim-blue-50",
  ghost: "text-clim-ink hover:bg-clim-blue-50",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as ButtonAsButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
