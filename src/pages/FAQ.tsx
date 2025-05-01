import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/common/SEO';
import FAQSection from '../components/sections/FAQ';
import { generateFAQSchema, generateBreadcrumbSchema } from '../utils/schemaTypes';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQPage: React.FC = () => {
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
        title={`${t('faq.title')} - ${t('hero.name')}`}
        description={t('faq.description')}
        schemas={[faqSchema, breadcrumbSchema]}
      />
      <FAQSection />
    </>
  );
};

export default FAQPage; 