import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Portfolio from '../components/sections/Portfolio';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';
import SectionSeparator from '../components/common/SectionSeparator';
import SEO from '../components/SEO';
import { 
  generateLocalBusinessSchema, 
  generateOrganizationSchema, 
  generateWebSiteSchema,
  generateBreadcrumbSchema 
} from '../utils/schemaTypes';

const Home: React.FC = () => {
  // Generate schemas for the home page
  const homeSchemas = [
    generateLocalBusinessSchema({}),
    generateOrganizationSchema({}),
    generateWebSiteSchema({}),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://riga3d.lv' }
    ])
  ];

  return (
    <>
      <SEO
        title="Riga3D Solutions - Professional 3D Scanning & Printing Services in Latvia"
        description="Expert 3D scanning and printing services in Riga, Latvia. Specializing in industrial 3D scanning, photogrammetry, and custom 3D printing solutions for architecture and manufacturing."
        keywords="3D scanning Riga, 3D printing Latvia, photogrammetry services, 3D model creation, industrial 3D scanning"
        url="https://riga3d.lv"
        schemas={homeSchemas}
      />

      {/* Hero section */}
      <div className="bg-gradient-to-br from-white via-indigo-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-indigo-900/10 dark:to-indigo-900/20 backdrop-blur-sm">
        <Hero />
      </div>
      
      <SectionSeparator color="fill-indigo-50/80 dark:fill-indigo-900/30" visible={false} />
      
      {/* Services section with teal gradient background */}
      <div className="bg-gradient-to-br from-white via-teal-50/30 to-teal-50/50 dark:from-gray-900 dark:via-teal-900/10 dark:to-teal-900/20 backdrop-blur-sm">
        <Services />
      </div>
      
      <SectionSeparator flipped={true} color="fill-teal-50/80 dark:fill-teal-900/30" visible={false} />
      
      {/* Portfolio section with amber gradient background */}
      <div className="bg-gradient-to-br from-white via-amber-50/30 to-amber-50/50 dark:from-gray-900 dark:via-amber-900/10 dark:to-amber-900/20 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative elements similar to ModernBackground */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-amber-300/10 to-amber-500/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-amber-400/10 to-amber-500/5 rounded-full blur-xl"></div>
        
        <Portfolio />
      </div>
      
      <SectionSeparator color="fill-amber-50/80 dark:fill-amber-900/30" visible={false} />
      
      {/* FAQ section with rose gradient background */}
      <div className="bg-gradient-to-br from-white via-rose-50/30 to-rose-50/50 dark:from-gray-900 dark:via-rose-900/10 dark:to-rose-900/20 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative elements similar to ModernBackground */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-br from-rose-300/10 to-rose-500/5 rounded-full blur-2xl"></div>
        
        <FAQ />
      </div>
      
      <SectionSeparator flipped={true} color="fill-rose-50/80 dark:fill-rose-900/30" visible={false} />
      
      {/* Contact section with violet gradient background */}
      <div className="bg-gradient-to-br from-white via-violet-50/30 to-violet-50/50 dark:from-gray-900 dark:via-violet-900/10 dark:to-violet-900/20 backdrop-blur-sm relative overflow-hidden">
        {/* Decorative elements similar to ModernBackground */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-violet-300/10 to-violet-500/5 rounded-full blur-xl"></div>
        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-gradient-to-br from-violet-400/10 to-violet-500/5 rounded-full blur-2xl"></div>
        
        <Contact />
      </div>
    </>
  );
};

export default Home; 