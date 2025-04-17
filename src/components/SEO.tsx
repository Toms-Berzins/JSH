import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SchemaType {
  '@context': string;
  '@type': string;
  name: string;
  image: string;
  description: string;
  url: string;
  [key: string]: unknown;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: SchemaType;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Riga3D Solutions - Professional 3D Scanning & Printing Services in Latvia',
  description = 'Expert 3D scanning and printing services in Riga, Latvia. Specializing in industrial 3D scanning, photogrammetry, and custom 3D printing solutions.',
  keywords = '3D scanning Riga, 3D printing Latvia, photogrammetry services, 3D model creation',
  image = 'https://riga3d.lv/og-image.jpg',
  url = 'https://riga3d.lv',
  type = 'website',
  schema,
}) => {
  const defaultSchema: SchemaType = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Riga3D Solutions',
    image: 'https://riga3d.lv/logo.jpg',
    description: 'Professional 3D scanning and printing services in Riga, Latvia',
    url: 'https://riga3d.lv',
  };

  const finalSchema = schema || defaultSchema;

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

      {/* Schema.org markup */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
};

export default SEO; 