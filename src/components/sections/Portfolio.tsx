import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
// import { Box, Image } from 'lucide-react'; // Box is unused
import { Image } from 'lucide-react'; // Import only Image
import { useTranslation } from 'react-i18next';
import { portfolioItems as staticPortfolioData } from '../../data/portfolioData';
import { PortfolioItem } from '../../types/portfolio.types';

interface PortfolioTranslation {
  id: number;
  title: string;
  description: string;
}

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    console.warn(`Failed to load image for project ID: ${id}`);
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const translatedData = t('portfolio.list', { returnObjects: true }) as PortfolioTranslation[];

  const portfolioItems = useMemo(() => {
    if (!Array.isArray(translatedData)) {
      console.error("Portfolio translation data is not an array:", translatedData);
      return staticPortfolioData as PortfolioItem[];
    }
    
    const translationMap = new Map(translatedData.map(item => [item.id, item]));

    return staticPortfolioData.map(staticItem => {
      const translation = translationMap.get(staticItem.id);
      return {
        ...staticItem,
        title: translation?.title || `Project ${staticItem.id}`,
        description: translation?.description || "",
      };
    });
  }, [translatedData]);

  return (
    <section id="portfolio" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 md:mb-20"
        >
          {t('portfolio.title')}
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[250px] md:auto-rows-[300px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden ${
                item.size === 'large' ? 'col-span-2 row-span-2' :
                item.size === 'medium' ? 'col-span-2' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              
              {imageErrors[item.id] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                  <Image className="w-16 h-16 text-gray-400 opacity-70" />
                </div>
              ) : (
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(item.id)}
                  loading="lazy"
                />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio; 