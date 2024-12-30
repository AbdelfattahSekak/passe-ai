import type { MetaObject } from '@nuxt/schema'

interface PageSEOConfig {
  title: string;
  description: string;
  image?: string;
  path: string;
  keywords?: string[];
  schema?: object;
}

export const generateMetaTags = (page: PageSEOConfig): MetaObject => {
  const siteName = 'Passe.ai';
  const baseUrl = 'https://passe.ai';
  const defaultImage = `${baseUrl}/social-share.jpg`;
  const fullUrl = `${baseUrl}${page.path}`;

  // Core keywords for road trip planning
  const defaultKeywords = [
    'AI road trip planner',
    'custom travel itinerary',
    'road trip route optimizer', 
    'travel stop recommendations',
    'road trip accommodation finder',
    'local attraction suggestions',
    'AI travel assistant'
  ];
  const keywords = [...defaultKeywords, ...(page.keywords || [])].join(', ');

  return {
    title: `${page.title} | ${siteName}`,
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {
        name: 'description',
        content: page.description
      },
      {
        name: 'keywords',
        content: keywords
      },
      // Mobile optimization
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5'
      },
      // Open Graph
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:title',
        content: page.title
      },
      {
        property: 'og:description',
        content: page.description
      },
      {
        property: 'og:image',
        content: page.image || defaultImage
      },
      {
        property: 'og:url',
        content: fullUrl
      },
      {
        property: 'og:site_name',
        content: siteName
      },
      // Twitter Cards
      {
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        name: 'twitter:title',
        content: page.title
      },
      {
        name: 'twitter:description',
        content: page.description
      },
      {
        name: 'twitter:image',
        content: page.image || defaultImage
      },
      // Additional SEO
      {
        name: 'robots',
        content: 'index, follow'
      },
      {
        name: 'author',
        content: siteName
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: fullUrl
      }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(page.schema || generateDefaultSchema(page, siteName, fullUrl))
      }
    ]
  };
};

function generateDefaultSchema(page: PageSEOConfig, siteName: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteName,
    url: url,
    description: page.description,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    author: {
      '@type': 'Organization',
      name: siteName,
      url: 'https://passe.ai'
    }
  };
}
