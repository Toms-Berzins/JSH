import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-40 pb-24 px-4 text-center"> {/* Increased padding */}
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
          className="text-lg md:text-xl text-blue-600 dark:text-blue-400 font-semibold mb-2"
        >
          {t('hero.greeting')} <span className="font-bold">{t('hero.name')}</span>
        </motion.h2>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4" // Adjusted size
        >
          {t('hero.tagline')}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
          className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8" // Adjusted size and spacing
        >
          {t('hero.description')}
        </motion.p>
        
        <motion.a
          href="#portfolio"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 15 }}
          className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          {t('hero.cta')}
        </motion.a>
      </div>
    </section>
  );
};

export default Hero; 