import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { generateServiceSchema, generateBreadcrumbSchema } from '../utils/schemaTypes';
import { Service } from '../types';

const Services: React.FC = () => {
  const { t } = useTranslation();
  const services = t('services.list', { returnObjects: true }) as Service[];

  // Generate schemas for each service
  const serviceSchemas = services.map(service => 
    generateServiceSchema({
      name: service.title,
      description: service.detailedDescription,
      image: `https://riga3d.lv/images/services/${service.key}.jpg`,
      offers: {
        description: service.description
      }
    })
  );

  // Add breadcrumb schema
  serviceSchemas.push(generateBreadcrumbSchema(['services']));

  return (
    <>
      <SEO
        title="Our Services - Riga3D Solutions"
        description="Professional 3D scanning, modeling, printing, and finishing services in Riga, Latvia. Expert solutions for industrial and creative applications."
        keywords="3D scanning services Riga, 3D printing services Latvia, photogrammetry services, 3D modeling services"
        url="https://riga3d.lv/services"
        schemas={serviceSchemas}
      />
      
      {/* Rest of your services page content */}
    </>
  );
};

export default Services; 