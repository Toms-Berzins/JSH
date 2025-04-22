import { Service, PortfolioItem } from '../types';

export interface BaseSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  url: string;
  [key: string]: unknown;
}

export interface LocalBusinessSchema extends BaseSchema {
  '@type': 'LocalBusiness';
  image: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    '@type': 'GeoCoordinates';
    latitude: string;
    longitude: string;
  };
  telephone?: string;
  priceRange?: string;
  openingHoursSpecification?: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  };
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

// Helper functions to generate schemas
export const generateLocalBusinessSchema = (data: Partial<LocalBusinessSchema>): LocalBusinessSchema => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Riga3D Solutions',
  image: 'https://riga3d.lv/logo.jpg',
  description: 'Professional 3D scanning and printing services in Riga, Latvia',
  url: 'https://riga3d.lv',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '[Your Street Address]',
    addressLocality: 'Riga',
    addressRegion: 'Riga',
    postalCode: '[Your Postal Code]',
    addressCountry: 'LV',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '[Your Latitude]',
    longitude: '[Your Longitude]',
  },
  telephone: '[Your Phone]',
  priceRange: '€€',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
  ...data,
});

export const generateServiceSchema = (service: Service): ServiceSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.detailedDescription,
  url: `https://riga3d.lv/services/${service.key}`,
  provider: {
    '@type': 'LocalBusiness',
    name: 'Riga3D Solutions',
    url: 'https://riga3d.lv',
  },
  areaServed: {
    '@type': 'City',
    name: 'Riga',
    containedInPlace: {
      '@type': 'Country',
      name: 'Latvia',
    },
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: `${service.title} Service`,
    itemListElement: [{
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
      },
    }],
  },
});

export const generateProductSchema = (item: PortfolioItem): ProductSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: item.title,
  description: item.description,
  image: `https://riga3d.lv/portfolio/${item.id}.jpg`,
  url: `https://riga3d.lv/portfolio/${item.id}`,
  brand: {
    '@type': 'Brand',
    name: 'Riga3D Solutions',
  },
  category: '3D Printed Product',
  material: 'Various',
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    price: 'Contact for quote',
    priceCurrency: 'EUR',
  },
});

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>): BreadcrumbListSchema => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  name: 'Breadcrumb',
  description: 'Navigation breadcrumb',
  url: 'https://riga3d.lv',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateFAQSchema = (faqs: Array<{ question: string; answer: string }>): FAQPageSchema => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  name: 'Frequently Asked Questions',
  description: 'Common questions about our 3D scanning and printing services',
  url: 'https://riga3d.lv/faq',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateOrganizationSchema = (data: Partial<OrganizationSchema>): OrganizationSchema => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Riga3D Solutions',
  description: 'Professional 3D scanning and printing services in Riga, Latvia',
  url: 'https://riga3d.lv',
  logo: 'https://riga3d.lv/logo.jpg',
  sameAs: [
    'https://www.facebook.com/riga3d',
    'https://www.linkedin.com/company/riga3d',
    'https://www.instagram.com/riga3d'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '[Your Phone]',
    contactType: 'customer service',
    areaServed: 'LV',
    availableLanguage: ['en', 'lv', 'ru']
  },
  ...data,
});

export const generateWebSiteSchema = (data: Partial<WebSiteSchema>): WebSiteSchema => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Riga3D Solutions',
  description: 'Professional 3D scanning and printing services in Riga, Latvia',
  url: 'https://riga3d.lv',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://riga3d.lv/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  ...data,
}); 