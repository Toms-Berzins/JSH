import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="pt-40 pb-24 px-4 text-center"> {/* Increased padding */}
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4" // Adjusted size
        >
          Transforming Ideas into 3D Reality
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 20 }}
          className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8" // Adjusted size and spacing
        >
          Professional 3D scanning, modeling, and printing services in Riga. From prototypes to production parts, we bring your designs to life.
        </motion.p>
        <motion.a // Changed to anchor for contact section link
          href="#contact" // Link to contact section
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 15 }}
          className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg" // Subtle skeuomorphic feel with shadow
        >
          Start Your Project
        </motion.a>
      </div>
    </section>
  );
};

export default Hero; 