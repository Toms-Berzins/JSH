import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AccordionItem from '../common/AccordionItem';

// Define type for FAQ items loaded from translation
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const { t } = useTranslation();

  // Load FAQ data from translations
  const faqs = t('faq.list', { returnObjects: true }) as FAQItem[];

  return (
    <section id="faq" className="py-20 md:py-28"> {/* Increased padding */}
      <div className="max-w-3xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 md:mb-20" // Added scroll animation
        >
          {t('faq.title')}
        </motion.h2>
        <div className="space-y-5"> {/* Increased spacing */}
          {Array.isArray(faqs) ? (
            faqs.map((faq, index) => (
              <AccordionItem key={index} question={faq.question} answer={faq.answer} />
            ))
          ) : (
            <p className="text-center text-gray-500">Could not load FAQ data.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 