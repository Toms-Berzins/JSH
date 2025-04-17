import React from 'react';
import { Mail, MessageSquare, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-12 border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          {/* Replace # with actual links */}
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Github className="h-6 w-6" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Linkedin className="h-6 w-6" /></a>
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Other Social" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><MessageSquare className="h-6 w-6" /></a> {/* Example: Contact/Blog Link */}
          <a href={`mailto:${t('contact.info.email.detail')}`} aria-label="Email" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"><Mail className="h-6 w-6" /></a>
        </div>

        <div className="mb-4 space-x-4 text-sm">
          {/* Translate footer links using navbar keys */}
          <a href="#services" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('navbar.services')}</a>
          <a href="#portfolio" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('navbar.portfolio')}</a>
          <a href="#faq" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('navbar.faq')}</a>
          <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t('navbar.contact')}</a>
        </div>

        {/* Translate copyright notice - using hero.name as placeholder for company/your name */}
        <p className="text-sm">&copy; {new Date().getFullYear()} {t('hero.name')}. {t('footer.rights')}</p>
        {/* Optional: Add Privacy Policy/Terms links if needed */}
      </div>
    </footer>
  );
};

export default Footer; 