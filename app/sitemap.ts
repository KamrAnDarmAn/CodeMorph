import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://code-morph-meta.vercel.app";

  const routes: {
    path: string;
    priority: number;
    changefreq:
      | "monthly"
      | "weekly"
      | "always"
      | "hourly"
      | "daily"
      | "yearly"
      | "never";
  }[] = [
    { path: "/", priority: 1, changefreq: "monthly" },
    { path: "/about", priority: 0.8, changefreq: "monthly" },
    { path: "/language", priority: 0.5, changefreq: "weekly" },
    { path: "/serialization", priority: 0.5, changefreq: "weekly" },
    { path: "/numbers-convertor", priority: 0.5, changefreq: "weekly" },
    { path: "/ast", priority: 0.5, changefreq: "weekly" },
  ];

  return routes.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: new Date().toISOString().split("T")[0], // YYYY-MM-DD
    changeFrequency: r.changefreq,
    priority: r.priority,
  }));
}
