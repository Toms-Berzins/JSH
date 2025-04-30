import React from 'react';
import { Mail, MessageSquare, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-12 border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {/* Replace # with actual links */}
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"><Github className="h-6 w-6" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"><Linkedin className="h-6 w-6" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Other Social" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"><MessageSquare className="h-6 w-6" /></a> {/* Example: Contact/Blog Link */}
          <a href={`mailto:${t('contact.info.email.detail')}`} aria-label="Email" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"><Mail className="h-6 w-6" /></a>
        </div>

        <div className="mb-4 space-x-4 text-sm">
          {/* Translate footer links using navbar keys */}
          <a href="#services" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{t('navbar.services')}</a>
          <a href="#portfolio" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{t('navbar.portfolio')}</a>
          <a href="#faq" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{t('navbar.faq')}</a>
          <a href="#contact" className="text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">{t('navbar.contact')}</a>
        </div>

        {/* Only show the rights text without copyright */}
        <p className="text-sm text-gray-400">{t('footer.rights')}</p>
      </div>
    </footer>
  );
};

export default Footer; 