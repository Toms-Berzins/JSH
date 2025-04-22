// Types definitions needed for schema generation
export interface BaseSchema {
  '@context': string;
  '@type': string;
  [key: string]: unknown; // Use unknown instead of any for better type safety
}

export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness';
  name: string;
  image: string;
  logo: string;
  telephone: string;
  email: string;
  description: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    '@type': 'GeoCoordinates';
    latitude: number;
    longitude: number;
  };
  url: string;
  priceRange: string;
  openingHoursSpecification: Array<{
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
}

export interface ServiceSchema extends BaseSchema {
  '@type': 'Service';
  provider: {
    '@type': 'LocalBusiness';
    name: string;
    url: string;
  };
  areaServed: {
    '@type': 'City';
    name: string;
    containedInPlace: {
      '@type': 'Country';
      name: string;
    };
  };
  hasOfferCatalog: {
    '@type': 'OfferCatalog';
    name: string;
    itemListElement: Array<{
      '@type': 'Offer';
      itemOffered: {
        '@type': 'Service';
        name: string;
        description: string;
      };
    }>;
  };
}

export interface ProductSchema extends BaseSchema {
  '@type': 'Product';
  image: string;
  brand: {
    '@type': 'Brand';
    name: string;
  };
  category: string;
  material: string;
  offers: {
    '@type': 'Offer';
    availability: string;
    price: string;
    priceCurrency: string;
  };
}

export interface BreadcrumbListSchema extends BaseSchema {
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

export interface FAQPageSchema extends BaseSchema {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization';
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
}

export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite';
  potentialAction: {
    '@type': 'SearchAction';
    target: string;
    'query-input': string;
  };
}

interface LocalBusinessProps {
  name?: string;
  image?: string;
  logo?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  url?: string;
  priceRange?: string;
  openingHours?: string[];
}

interface ServiceProps {
  name: string;
  description: string;
  image?: string;
  provider?: {
    name: string;
    url: string;
  };
  areaServed?: string[];
  offers?: {
    price?: number;
    priceCurrency?: string;
    description?: string;
  };
}

interface ProductProps {
  name: string;
  description: string;
  image?: string;
  brand?: string;
  offers?: {
    price?: number;
    priceCurrency?: string;
    availability?: string;
  };
}

interface FAQProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

// Helper functions to generate schemas
export const generateLocalBusinessSchema = ({
  name = 'Riga3D Solutions',
  image = 'https://riga3d.lv/images/company-building.jpg',
  logo = 'https://riga3d.lv/images/logo.png',
  telephone = '+371 20123456',
  email = 'info@riga3d.lv',
  address = {
    streetAddress: 'Riga Technology Park, Building 3',
    addressLocality: 'Riga',
    postalCode: 'LV-1063',
    addressCountry: 'Latvia',
  },
  geo = {
    latitude: 56.9496,
    longitude: 24.1052,
  },
  url = 'https://riga3d.lv',
  priceRange = '€€',
  openingHours = ['Mo-Fr 09:00-18:00', 'Sa 10:00-14:00']
}: LocalBusinessProps = {}): LocalBusinessSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    image,
    logo,
    telephone,
    email,
    description: 'Professional 3D scanning and printing services in Riga, Latvia',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.streetAddress || '',
      addressLocality: address.addressLocality || '',
      postalCode: address.postalCode || '',
      addressCountry: address.addressCountry || ''
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude || 0,
      longitude: geo.longitude || 0
    },
    url,
    priceRange,
    openingHoursSpecification: openingHours.map((hours: string) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1].split('-')[0],
      closes: hours.split(' ')[1].split('-')[1]
    }))
  };
};

export const generateServiceSchema = ({
  name,
  description,
  image,
  provider = {
    name: 'Riga3D Solutions',
    url: 'https://riga3d.lv'
  },
  areaServed = ['Riga', 'Latvia', 'Baltic region'],
  offers
}: ServiceProps): BaseSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    ...(image && { image }),
    provider: {
      '@type': 'Organization',
      ...provider
    },
    areaServed: areaServed.map(area => ({
      '@type': 'GeoCircle',
      name: area
    })),
    ...(offers && {
      offers: {
        '@type': 'Offer',
        ...offers
      }
    })
  };
};

export const generateProductSchema = ({
  name,
  description,
  image,
  brand = 'Riga3D Solutions',
  offers
}: ProductProps): BaseSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    ...(image && { image }),
    brand: {
      '@type': 'Brand',
      name: brand
    },
    ...(offers && {
      offers: {
        '@type': 'Offer',
        ...offers
      }
    })
  };
};

export const generateBreadcrumbSchema = (pathSegments: string[] = []): BreadcrumbListSchema => {
  const items = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Home',
      item: 'https://riga3d.lv'
    }
  ];

  pathSegments.forEach((segment, index) => {
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    const path = `https://riga3d.lv/${pathSegments.slice(0, index + 1).join('/')}`;
    
    items.push({
      '@type': 'ListItem' as const,
      position: index + 2,
      name,
      item: path
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList' as const,
    itemListElement: items
  };
};

export const generateFAQSchema = ({
  questions
}: FAQProps): FAQPageSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
};

export const generateOrganizationSchema = (): BaseSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Riga3D Solutions',
    url: 'https://riga3d.lv',
    logo: 'https://riga3d.lv/images/logo.png',
    sameAs: [
      'https://facebook.com/riga3dsolutions',
      'https://instagram.com/riga3d',
      'https://linkedin.com/company/riga3d-solutions'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+371 20123456',
      contactType: 'customer service',
      availableLanguage: ['Latvian', 'English', 'Russian']
    }
  };
};

export const generateWebSiteSchema = (): BaseSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Riga3D Solutions',
    url: 'https://riga3d.lv',
    description: 'Professional 3D scanning and printing services in Riga, Latvia',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://riga3d.lv/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}; 