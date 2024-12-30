import { SEO_CONFIG } from '~/config/seo';

// Plugin to add global SEO defaults
export default defineNuxtPlugin(() => {
  useHead({
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: SEO_CONFIG.themeColor },
      { property: 'og:site_name', content: SEO_CONFIG.siteName },
      { name: 'twitter:site', content: SEO_CONFIG.twitterHandle }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  });
});
