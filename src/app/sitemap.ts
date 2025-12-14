import { MetadataRoute } from 'next'
import { siteConfig } from '@/data/content'

const locales = ["en", "fr", "es"];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url

  const routes = [
    { path: "", priority: 1, freq: "monthly" as const },
    { path: "#features", priority: 0.8, freq: "monthly" as const },
    { path: "#guide", priority: 0.8, freq: "monthly" as const },
    { path: "/privacy-policy", priority: 0.5, freq: "yearly" as const },

  ];

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route.path}`.replace(/\/+$/, ""),
      lastModified: new Date(),
      changeFrequency: route.freq,
      priority: route.priority,
    }))
  );
}