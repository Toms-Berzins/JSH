import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/common/SEO';
import ContactSection from '../components/sections/Contact';
import { 
  generateLocalBusinessSchema,
  generateBreadcrumbSchema
} from '../utils/schemaTypes';

const ContactPage: React.FC = () => {
  const { t } = useTranslation();

  // Generate schemas for the contact page
  const contactSchemas = [
    generateLocalBusinessSchema({
      name: t('hero.name'),
      description: t('hero.description'),
      telephone: t('contact.phone'),
      email: t('contact.email'),
      address: {
        streetAddress: t('contact.address.street'),
        addressLocality: t('contact.address.city'),
        postalCode: t('contact.address.postalCode'),
        addressCountry: t('contact.address.country')
      }
    }),
    generateBreadcrumbSchema(['contact'])
  ];

  return (
    <>
      <SEO
        title={`${t('contact.title')} - ${t('hero.name')}`}
        description={t('contact.description')}
        schemas={contactSchemas}
      />
      <ContactSection />
    </>
  );
};

export default ContactPage; 