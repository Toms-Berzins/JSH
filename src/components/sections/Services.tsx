import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Printer, Wrench, File, Paintbrush, ChevronDown, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types/service.types';

const services: ServiceItem[] = [
  { 
    icon: <Scan className="h-8 w-8" />, 
    title: "3D Scanning", 
    description: "High-quality photogrammetry-based 3D scanning using Poly.cam technology to capture detailed digital models of your objects.",
    detailedDescription: "Our photogrammetry-based 3D scanning service creates highly detailed digital replicas of physical objects. Using advanced Poly.cam technology and high-resolution cameras, we capture every nuance of your items with precision.",
    benefits: [
      "Non-destructive digitization of physical objects",
      "Highly detailed models suitable for various applications",
      "Quick turnaround compared to manual modeling",
      "Accurate dimensions and textures"
    ],
    applications: [
      "Heritage preservation and documentation",
      "Art reproduction and archiving",
      "Reverse engineering of parts",
      "Creating digital assets for AR/VR"
    ],
    processSummary: "We capture hundreds of photos of your object from various angles, process them through specialized software, and deliver a clean, optimized 3D model ready for printing or digital use."
  },
  { 
    icon: <File className="h-8 w-8" />, 
    title: "3D Modeling", 
    description: "Professional 3D model creation and optimization, including mesh cleaning and preparation for printing.",
    detailedDescription: "Our 3D modeling services transform concepts into detailed digital models. Whether starting from scratch or enhancing scan data, we create precision models optimized for your specific application.",
    benefits: [
      "Professional-grade models with optimal topology",
      "Models optimized for specific use cases",
      "Fixing mesh issues from scans",
      "Technical accuracy for functional parts"
    ],
    applications: [
      "Product design and prototyping",
      "Architectural visualizations",
      "Game and animation assets",
      "Manufacturing preparation"
    ],
    processSummary: "We work with your specifications to create detailed 3D models, carefully optimizing meshes, adding textures, and ensuring they're ready for printing or digital applications."
  },
  { 
    icon: <Printer className="h-8 w-8" />, 
    title: "3D Printing", 
    description: "Precise FDM and resin printing services for prototypes, models, and production parts.",
    detailedDescription: "We offer both FDM (Fused Deposition Modeling) and resin-based 3D printing services. FDM provides durable, functional parts while our resin printing delivers extraordinary detail for smaller objects.",
    benefits: [
      "Rapid prototyping capabilities",
      "Wide range of materials available",
      "Cost-effective small batch production",
      "Complex geometries not possible with traditional manufacturing"
    ],
    applications: [
      "Functional prototypes and testing",
      "Scale models and visual prototypes",
      "Custom tools and fixtures",
      "End-use parts for specific applications"
    ],
    processSummary: "We prepare your 3D model for printing, select the appropriate technology and material for your needs, and carefully print your object with optimal settings for quality and durability."
  },
  { 
    icon: <Wrench className="h-8 w-8" />, 
    title: "Post-Processing", 
    description: "Comprehensive finishing services including support removal, sanding, and surface treatment.",
    detailedDescription: "Our post-processing services transform raw 3D prints into refined final products. We carefully remove support structures, smooth surfaces, and apply necessary treatments to enhance functionality and appearance.",
    benefits: [
      "Professional finish quality",
      "Improved mechanical properties",
      "Enhanced surface aesthetics",
      "Preparation for further finishing or use"
    ],
    applications: [
      "Display models requiring smooth surfaces",
      "Functional prototypes needing precise tolerances",
      "Parts requiring specific surface quality",
      "Preparation for painting or coating"
    ],
    processSummary: "We meticulously remove support structures, sand and smooth surfaces, and apply specialized treatments to achieve the desired finish quality for your 3D printed objects."
  },
  { 
    icon: <Paintbrush className="h-8 w-8" />, 
    title: "Custom Finishing", 
    description: "Professional painting and surface finishing to meet your specific requirements.",
    detailedDescription: "Our custom finishing services elevate 3D printed objects with professional-grade painting, coating, and decorative applications that transform basic prints into showcase-worthy pieces.",
    benefits: [
      "Professional aesthetic quality",
      "UV and weather resistance options",
      "Custom colors and finishes",
      "Enhanced durability for end-use parts"
    ],
    applications: [
      "Architectural models and presentations",
      "Product prototypes for client presentations",
      "Display models and replicas",
      "Functional parts requiring specific surface properties"
    ],
    processSummary: "We prime, paint, and finish your 3D printed objects using professional techniques and materials to achieve your desired aesthetic and functional requirements."
  }
];

const Services: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
          Our Services
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.15, type: "spring", stiffness: 80, damping: 15 }}
              className={`rounded-2xl bg-white dark:bg-gray-700/80 shadow-subtle hover:shadow-lg transition-all duration-300 backdrop-blur-sm overflow-hidden ${expandedIndex === index ? 'lg:col-span-2 lg:row-span-2' : ''}`}
            >
              <div 
                className="p-6 md:p-8 cursor-pointer flex flex-col"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="text-blue-600 dark:text-blue-400 mb-5">{service.icon}</div>
                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                  </motion.div>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-base">{service.description}</p>
                
                <AnimatePresence>
                  {expandedIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600"
                    >
                      {service.detailedDescription && (
                        <p className="text-gray-700 dark:text-gray-200 mb-4">
                          {service.detailedDescription}
                        </p>
                      )}
                      
                      {service.benefits && service.benefits.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-lg mb-2">Benefits</h4>
                          <ul className="space-y-1">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start">
                                <ArrowRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.applications && service.applications.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-lg mb-2">Applications</h4>
                          <ul className="space-y-1">
                            {service.applications.map((application, i) => (
                              <li key={i} className="flex items-start">
                                <ArrowRight className="h-4 w-4 text-blue-500 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-sm text-gray-600 dark:text-gray-300">{application}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {service.processSummary && (
                        <div>
                          <h4 className="font-semibold text-lg mb-2">Process</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {service.processSummary}
                          </p>
                        </div>
                      )}
                      
                      <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white text-sm rounded-full font-medium hover:bg-blue-700 transition-colors"
                      >
                        Request {service.title}
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