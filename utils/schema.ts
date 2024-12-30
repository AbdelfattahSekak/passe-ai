// Centralized schema generation
export const generateTravelSchema = (title: string, description: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAction',
    name: title,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Passe.ai',
      url: 'https://passe.ai'
    }
  };
};