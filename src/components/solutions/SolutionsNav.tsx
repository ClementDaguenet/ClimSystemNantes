import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { solutions } from "@/data/solutions";

export function SolutionsNav() {
  return (
    <nav
      aria-label="Catégories de solutions"
      className="sticky top-16 z-30 border-b border-clim-blue-100 bg-white/95 backdrop-blur-md"
    >
      <Container>
        <ul
          role="list"
          className="flex gap-2 overflow-x-auto py-3 scrollbar-thin"
        >
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <li key={sol.id}>
                <Link
                  href={`#${sol.slug}`}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-clim-blue-100 bg-clim-bg px-4 py-2 text-sm font-medium text-clim-ink transition-colors hover:border-clim-blue-500 hover:bg-clim-blue-50 hover:text-clim-blue-700"
                >
                  <Icon size={16} aria-hidden="true" className="text-clim-blue-500" />
                  {sol.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </nav>
  );
}
