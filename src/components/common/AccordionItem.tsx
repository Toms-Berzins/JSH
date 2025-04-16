import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../types/faq.types';

// Removed unnecessary AccordionItemProps interface

// Use FAQItem directly as the prop type
const AccordionItem: React.FC<FAQItem> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ borderRadius: 10 }}
      className="bg-white dark:bg-gray-800 shadow-subtle rounded-lg overflow-hidden"
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.button
        className="w-full px-6 py-4 text-left flex items-center justify-between font-medium"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {question}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.button>
      {/* Use AnimatePresence for smooth exit animation */}
      <motion.section
        key="content"
        initial="collapsed"
        animate={isOpen ? "open" : "collapsed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          collapsed: { opacity: 0, height: 0 }
        }}
        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
        style={{ overflow: 'hidden' }}
      >
        <motion.div
          variants={{ collapsed: { y: -10 }, open: { y: 0 } }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-4 text-gray-600 dark:text-gray-300"
        >
          {answer}
        </motion.div>
      </motion.section>
    </motion.div>
  );
};

export default AccordionItem; 