import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { 
  BaseSchema,
  generateLocalBusinessSchema 
} from "../../utils/schemaTypes";
import { generateHreflangTags, getPathWithoutLangPrefix } from "../../utils/hreflang";

interface HreflangLink {
  rel: string;
  hreflang: string;
  href: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schemas?: Array<BaseSchema>;
  hreflangTags?: Array<HreflangLink>;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Riga3D Solutions - Professional 3D Scanning & Printing Services in Latvia',
  description = 'Expert 3D scanning and printing services in Riga, Latvia. Specializing in industrial 3D scanning, photogrammetry, and custom 3D printing solutions.',
  keywords = '3D scanning Riga, 3D printing Latvia, photogrammetry services, 3D model creation',
  image = 'https://riga3d.lv/og-image.jpg',
  url = 'https://riga3d.lv',
  type = 'website',
  schemas = [generateLocalBusinessSchema({})],
  hreflangTags,
}) => {
  const location = useLocation();
  
  // If hreflangTags are not provided, generate them based on current path
  const finalHreflangTags = hreflangTags || 
    generateHreflangTags(getPathWithoutLangPrefix(location.pathname));
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Hreflang tags for multilingual SEO */}
      {finalHreflangTags.map((link, index) => (
        link.hreflang ? (
          <link 
            key={`hreflang-${index}`} 
            rel={link.rel} 
            hrefLang={link.hreflang} 
            href={link.href} 
          />
        ) : (
          <link 
            key={`canonical-${index}`} 
            rel={link.rel} 
            href={link.href} 
          />
        )
      ))}

      {/* Schema.org markup */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO; 