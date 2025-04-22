import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import { generateHreflangTags, getPathWithoutLangPrefix } from '../utils/hreflang';
import { generateLocalBusinessSchema, generateServiceSchema } from '../utils/schemaTypes';

// Define interface for service items from translation
interface ServiceItem {
  key: string;
  title: string;
  description: string;
  detailedDescription?: string;
  benefits?: string[];
  applications?: string[];
  processSummary?: string;
}

const Services: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  // Generate schemas for services page
  const schemas = [
    generateLocalBusinessSchema({}),
    generateServiceSchema({
      name: t('services.sectionTitle'),
      description: t('services.description') || 'Professional 3D scanning and printing services'
    })
  ];
  
  // Generate hreflang tags for SEO
  const hreflangTags = generateHreflangTags(getPathWithoutLangPrefix(location.pathname));
  
  // Safely get services list from translations
  const getServicesList = (): ServiceItem[] => {
    try {
      const services = t('services.list', { returnObjects: true });
      return Array.isArray(services) ? services : [];
    } catch (error) {
      console.error('Error getting services list:', error);
      return [];
    }
  };
  
  const servicesList = getServicesList();
  
  return (
    <>
      <SEO
        title={`${t('services.title')} - ${t('hero.name')}`}
        description={t('services.description') || 'Professional 3D scanning and printing services in Riga, Latvia'}
        keywords={'3D scanning, 3D printing, 3D modeling, Riga, Latvia'}
        url={`https://riga3d.lv${location.pathname}`}
        schemas={schemas}
        hreflangTags={hreflangTags}
      />
      
      <div className="container mx-auto px-4 py-20 mt-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('services.sectionTitle')}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('services.description') || 'Explore our range of professional 3D scanning and printing services.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <div 
              key={service.key || index} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <div className="mt-4">
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    aria-label={`${t('services.requestButtonPrefix')} ${service.title}`}
                  >
                    {t('services.requestButtonPrefix')} {service.title}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services; 