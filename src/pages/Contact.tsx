import React from 'react';
import SEO from '../components/SEO';
import Contact from '../components/sections/Contact';
import { 
  generateLocalBusinessSchema,
  generateBreadcrumbSchema
} from '../utils/schemaTypes';

const ContactPage: React.FC = () => {
  // Generate schemas for the contact page
  const contactSchemas = [
    generateLocalBusinessSchema(),
    generateBreadcrumbSchema(['contact'])
  ];

  return (
    <>
      <SEO
        title="Contact Us - Riga3D Solutions"
        description="Get in touch with Riga3D Solutions for professional 3D scanning and printing services in Latvia. We're here to help with your project needs."
        keywords="contact 3D scanning Riga, 3D printing Latvia contact, photogrammetry services contact"
        url="https://riga3d.lv/contact"
        schemas={contactSchemas}
      />
      
      <Contact />
    </>
  );
};

export default ContactPage; 