import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/schemaTypes';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();
  const faqs = t('faq.list', { returnObjects: true }) as FAQItem[];

  // Generate FAQ schema
  const faqSchema = generateFAQSchema({
    questions: faqs
  });

  // Add breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema(['faq']);

  return (
    <>
      <SEO
        title="FAQ - Riga3D Solutions"
        description="Find answers to common questions about our 3D scanning and printing services. Learn about our processes, capabilities, and how we can help with your project."
        keywords="3D scanning FAQ, 3D printing questions, photogrammetry FAQ, 3D modeling FAQ Latvia"
        url="https://riga3d.lv/faq"
        schemas={[faqSchema, breadcrumbSchema]}
      />
      
      {/* Rest of your FAQ page content */}
    </>
  );
};

export default FAQ; 