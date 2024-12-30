import { SEO_CONFIG } from '~/config/seo';

// Global middleware to ensure consistent SEO across all pages
export default defineNuxtRouteMiddleware((to) => {
  useHead({
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.siteName;
    },
    meta: [
      { name: 'theme-color', content: SEO_CONFIG.themeColor }
    ],
    link: [
      { rel: 'canonical', href: `${SEO_CONFIG.baseUrl}${to.path}` }
    ]
  });
});