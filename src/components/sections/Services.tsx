import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ServiceItem } from '../../types/service.types';

// Define icons map (optional but cleaner)
const serviceIcons: { [key: string]: React.ReactNode } = {
  scan: <img src="https://res.cloudinary.com/dhjfaktyk/image/upload/v1745211023/scan.png" alt="Scan service icon" className="h-40 w-40" />,
  model: <img src="https://res.cloudinary.com/dhjfaktyk/image/upload/v1744875844/model_oyxjs9.png" alt="Model service icon" className="h-40 w-40" />,
  print: <img src="https://res.cloudinary.com/dhjfaktyk/image/upload/v1744873689/print_drb70n.png" alt="Print service icon" className="h-40 w-40" />,
  postprocess: <img src="https://res.cloudinary.com/dhjfaktyk/image/upload/v1744876071/postprocess_o5kt1q.png" alt="Postprocess service icon" className="h-40 w-40" />,
  finish: <img src="https://res.cloudinary.com/dhjfaktyk/image/upload/v1744876210/finish_v1usqk.png" alt="Finish service icon" className="h-40 w-40" />,
};

const Services: React.FC = () => {
  const { t } = useTranslation();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Fetch services data from translations and cast to the expected type
  const servicesData = t('services.list', { returnObjects: true }) as ServiceItem[];

  // Map translated data to include icons 
  // Check if servicesData is actually an array before mapping
  const services = Array.isArray(servicesData) 
    ? servicesData.map(service => ({
        ...service,
        icon: serviceIcons[service.key] || <img src="https://res.cloudinary.com/dhjfaktyk/image/upload/v1744875844/model_oyxjs9.png" alt="Default service icon" className="h-40 w-40" />
      }))
    : []; // Provide an empty array fallback if translation fails

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-white/60 dark:bg-gray-800/60">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 md:mb-20"
        >
          {t('services.sectionTitle')}
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 80, damping: 15 }}
              className={`rounded-2xl bg-white dark:bg-gray-700/80 shadow-subtle hover:shadow-lg transition-all duration-300 backdrop-blur-sm overflow-hidden ${expandedIndex === index ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              <div
                className="p-6 md:p-8 cursor-pointer flex flex-col h-full"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="text-primary-500 dark:text-primary-400">{service.icon}</div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                  </motion.div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-base flex-grow">
                  {service.description}
                </p>
                
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 overflow-hidden"
                    >
                      {service.detailedDescription && (
                        <p className="text-gray-700 dark:text-gray-200 mb-4 text-sm">
                          {service.detailedDescription}
                        </p>
                      )}
                      
                      {service.benefits && service.benefits.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-md mb-2">{t('services.benefitsTitle')}</h4>
                          <ul className="space-y-1">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <ArrowRight className="h-4 w-4 text-primary-500 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.applications && service.applications.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-md mb-2">{t('services.applicationsTitle')}</h4>
                          <ul className="space-y-1">
                            {service.applications.map((application, i) => (
                              <li key={i} className="flex items-start">
                                <ArrowRight className="h-4 w-4 text-primary-500 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{application}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.processSummary && (
                        <div>
                          <h4 className="font-semibold text-md mb-2">{t('services.processTitle')}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {service.processSummary}
                          </p>
                        </div>
                      )}
                      
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block mt-6 px-4 py-2 bg-primary-500 text-white text-sm rounded-full font-medium hover:bg-primary-600 transition-colors"
                      >
                        {`${t('services.requestButtonPrefix')} ${service.title}`}
                      </motion.a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services; 