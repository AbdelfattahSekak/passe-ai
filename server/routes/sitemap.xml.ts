import { SitemapStream, streamToPromise } from "sitemap";

export default defineEventHandler(async (event) => {
  const sitemap = new SitemapStream({
    hostname: "https://passe.ai",
  });

  // Define supported locales
  const locales = ["en", "fr", "es", "ar"];

  // Define static routes
  const staticRoutes = ["/", "/about", "/contact", "/privacy", "/terms"];

  // Add static routes for each locale
  for (const locale of locales) {
    for (const route of staticRoutes) {
      sitemap.write({
        url: `/${locale}${route}`,
        changefreq: "weekly",
        priority: route === "/" ? 1.0 : 0.8,
        lastmod: new Date().toISOString(),
      });
    }
  }

  sitemap.end();

  return streamToPromise(sitemap);
});
