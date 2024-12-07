export const generateMetaTags = (page: {
  title: string;
  description: string;
  image?: string;
  path: string;
}) => {
  const siteName = 'Passe.ai';
  const defaultImage = 'https://passe.ai/social-share.jpg';

  return {
    title: `${page.title} | ${siteName}`,
    meta: [
      {
        name: 'description',
        content: page.description
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
        property: 'og:site_name',
        content: siteName
      },
      // Twitter
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
      }
    ]
  };
};