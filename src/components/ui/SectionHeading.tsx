import { cn } from "@/lib/cn";
import { FadeIn } from "./FadeIn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-clim-red-500">
          {eyebrow}
        </p>
      )}
      <Heading className="text-3xl font-bold tracking-tight text-clim-ink sm:text-4xl lg:text-5xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 text-base text-clim-muted sm:text-lg">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
