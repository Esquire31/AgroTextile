export const SEO_DEFAULTS = {
  titleTemplate: '%s | Agritex Global',
  description: 'Precision textile sourcing for sustainable scale',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agritex.com',
  },
  twitter: {
    handle: '@agritexglobal',
    site: '@agritexglobal',
    cardType: 'summary_large_image',
  },
};

export function generateSEO({
  title,
  description,
  image,
  url,
}) {
  return {
    title,
    description: description || SEO_DEFAULTS.description,
    openGraph: {
      title,
      description: description || SEO_DEFAULTS.description,
      image,
      url,
      ...SEO_DEFAULTS.openGraph,
    },
    twitter: {
      title,
      description: description || SEO_DEFAULTS.description,
      image,
      ...SEO_DEFAULTS.twitter,
    },
  };
}
