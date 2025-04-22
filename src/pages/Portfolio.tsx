import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { generateProductSchema, generateBreadcrumbSchema } from '../utils/schemaTypes';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const portfolioItems = t('portfolio.list', { returnObjects: true }) as PortfolioItem[];

  // Generate schemas for each portfolio item
  const productSchemas = portfolioItems.map(item => generateProductSchema({
    name: item.title,
    description: item.description,
    image: `https://riga3d.lv/images/portfolio/${item.id}.jpg`,
    offers: {
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR'
    }
  }));

  // Add breadcrumb schema
  productSchemas.push(generateBreadcrumbSchema(['portfolio']));

  return (
    <>
      <SEO
        title="Our Portfolio - Riga3D Solutions"
        description="Explore our portfolio of 3D scanning and printing projects. From medical models to architectural prototypes, see how we bring ideas to life."
        keywords="3D printing portfolio Latvia, 3D scanning projects Riga, photogrammetry examples, 3D modeling portfolio"
        url="https://riga3d.lv/portfolio"
        schemas={productSchemas}
      />
      
      {/* Rest of your portfolio page content */}
    </>
  );
};

export default Portfolio; 