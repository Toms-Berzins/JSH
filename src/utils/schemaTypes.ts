/**
 * Utility functions for generating Schema.org structured data
 */

// Base schema interface
export interface BaseSchema {
  "@context": string;
  "@type": string;
  [key: string]: string | number | boolean | object | undefined;
}

// Service schema props
export interface ServiceProps {
  name: string;
  description: string;
  image?: string;
  url?: string;
  provider?: {
    name: string;
    url: string;
  };
  offers?: {
    price?: string;
    priceCurrency?: string;
    description?: string;
  };
}

// Local business schema props
export interface LocalBusinessProps {
  name?: string;
  description?: string;
  url?: string;
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
  openingHours?: string[];
  images?: string[];
}

/**
 * Generate Schema.org service schema
 */
export const generateServiceSchema = (props: ServiceProps): BaseSchema => {
  const {
    name,
    description,
    image = 'https://riga3d.lv/images/logo.png',
    url = 'https://riga3d.lv',
    provider = {
      name: 'Riga3D Solutions',
      url: 'https://riga3d.lv'
    },
    offers = {}
  } = props;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": provider.name,
      "url": provider.url
    },
    "image": image,
    "url": url,
    ...(offers.price && {
      "offers": {
        "@type": "Offer",
        "price": offers.price,
        "priceCurrency": offers.priceCurrency || "EUR",
        ...(offers.description && { "description": offers.description })
      }
    })
  };
};

/**
 * Generate Schema.org local business schema
 */
export const generateLocalBusinessSchema = (props: LocalBusinessProps): BaseSchema => {
  const {
    name = 'Riga3D Solutions',
    description = 'Professional 3D scanning and printing services in Riga, Latvia',
    url = 'https://riga3d.lv',
    telephone = '+371 20 123 456',
    email = 'info@riga3d.lv',
    address = {
      streetAddress: 'Riga',
      addressLocality: 'Riga',
      postalCode: 'LV-1001',
      addressCountry: 'Latvia'
    },
    geo = {
      latitude: 56.9496,
      longitude: 24.1052
    },
    openingHours = ['Mo-Fr 09:00-18:00'],
    images = ['https://riga3d.lv/images/logo.png']
  } = props;
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "openingHours": openingHours,
    "image": images
  };
};

/**
 * Generate Schema.org organization schema
 */
export const generateOrganizationSchema = (): BaseSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Riga3D Solutions",
    "url": "https://riga3d.lv",
    "logo": "https://riga3d.lv/images/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+371 20 123 456",
      "contactType": "customer service",
      "availableLanguage": ["English", "Latvian", "Russian"]
    },
    "sameAs": [
      "https://www.facebook.com/riga3d",
      "https://www.instagram.com/riga3dsolutions",
      "https://www.linkedin.com/company/riga3dsolutions"
    ]
  };
};

/**
 * Generate Schema.org website schema
 */
export const generateWebSiteSchema = (): BaseSchema => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Riga3D Solutions",
    "url": "https://riga3d.lv",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://riga3d.lv/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
};

/**
 * Generate Schema.org breadcrumb schema
 */
export const generateBreadcrumbSchema = (items: string[]): BaseSchema => {
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://riga3d.lv"
    }
  ];
  
  items.forEach((item, index) => {
    itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": item.charAt(0).toUpperCase() + item.slice(1),
      "item": `https://riga3d.lv/${item}`
    });
  });
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
};

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

interface FAQProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

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