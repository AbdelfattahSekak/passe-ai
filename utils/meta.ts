import type { MetaObject } from '@nuxt/schema';

// Centralized meta tag generation for consistency
export const generatePageMeta = (path: string): MetaObject['meta'] => {
  return [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5'
    },
    {
      name: 'format-detection',
      content: 'telephone=no'
    },
    {
      name: 'robots',
      content: 'index, follow'
    },
    {
      name: 'google',
      content: 'notranslate'
    }
  ];
};