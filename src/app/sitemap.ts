import type { MetadataRoute } from "next";

const baseUrl = "https://www.climsystem.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/solutions", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/agences", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/sav", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFrequency: "yearly" as const },
    {
      path: "/mentions-legales",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    {
      path: "/politique-confidentialite",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
  ];
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
