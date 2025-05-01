import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/common/SEO';
import ServicesSection from '../components/sections/Services';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/schemaTypes';

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  
  // Generate schemas for SEO
  const schemas = [
    generateServiceSchema({
      name: t('services.title'),
      description: t('services.description') 
    }),
    generateBreadcrumbSchema(['services'])
  ];
  
  return (
    <>
      <SEO
        title={`${t('services.title')} - ${t('hero.name')}`}
        description={t('services.description')}
        schemas={schemas}
      />
      <ServicesSection />
    </>
  );
};

export default ServicesPage; 