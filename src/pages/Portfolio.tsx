import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/common/SEO';
import PortfolioSection from '../components/sections/Portfolio';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/schemaTypes';
import { PortfolioItem } from '../types';

const PortfolioPage: React.FC = () => {
  const { t } = useTranslation();
  const portfolioItems = t('portfolio.list', { returnObjects: true }) as PortfolioItem[];

  // Generate schemas for each portfolio item
  const serviceSchemas = portfolioItems.map(item => generateServiceSchema({
    name: item.title,
    description: item.description,
    image: `https://riga3d.lv/images/portfolio/${item.id}.jpg`,
    offers: {
      priceCurrency: 'EUR'
    }
  }));

  // Add breadcrumb schema
  serviceSchemas.push(generateBreadcrumbSchema(['portfolio']));

  return (
    <>
      <SEO
        title={`${t('portfolio.title')} - ${t('hero.name')}`}
        description={t('portfolio.description')}
        schemas={serviceSchemas}
      />
      <PortfolioSection />
    </>
  );
};

export default PortfolioPage; 