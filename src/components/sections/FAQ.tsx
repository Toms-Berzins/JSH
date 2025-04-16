import { motion } from 'framer-motion';
import AccordionItem from '../common/AccordionItem';
import { faqs } from '../../data/faqData';

const FAQ: React.FC = () => {
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
          Have Questions?
        </motion.h2>
        <div className="space-y-5"> {/* Increased spacing */}
          {faqs.map((faq, index) => (
            // Use the common AccordionItem component
            <AccordionItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 