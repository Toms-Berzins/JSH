/**
 * Utility function to generate hreflang tags for SEO optimization
 * of multilingual content as described in MULTILINGUAL.md
 */

interface HreflangLink {
  rel: string;
  hreflang: string;
  href: string;
}

/**
 * Generates the hreflang tags for SEO using the current pathname
 * @param pathname - The current path without language prefix
 * @returns Array of objects with rel, hreflang and href properties
 */
export const generateHreflangTags = (pathname: string): HreflangLink[] => {
  const supportedLanguages = ['en', 'lv', 'ru'];
  const baseUrl = 'https://riga3d.lv'; // Replace with your actual domain
  
  // Create canonical link and alternate language links
  const links: HreflangLink[] = [
    // Canonical link (defaults to Latvian as the primary market)
    {
      rel: 'canonical',
      hreflang: '', // No hreflang for canonical
      href: `${baseUrl}/lv${pathname}`,
    },
  ];
  
  // Add alternate language links
  supportedLanguages.forEach(lang => {
    links.push({
      rel: 'alternate',
      hreflang: lang,
      href: `${baseUrl}/${lang}${pathname}`,
    });
  });
  
  // Add x-default for language negotiation
  links.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${baseUrl}/en${pathname}`, // Typically English is the default fallback
  });
  
  return links;
};

/**
 * Extracts path without language prefix
 * @param fullPath - The full path including language prefix
 * @returns Path without language prefix
 */
export const getPathWithoutLangPrefix = (fullPath: string): string => {
  const supportedLanguages = ['en', 'lv', 'ru'];
  const pathSegments = fullPath.split('/').filter(Boolean);
  
  if (pathSegments.length > 0 && supportedLanguages.includes(pathSegments[0])) {
    return '/' + pathSegments.slice(1).join('/');
  }
  
  return fullPath;
};

export default {
  generateHreflangTags,
  getPathWithoutLangPrefix,
}; 