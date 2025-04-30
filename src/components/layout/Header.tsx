import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const changeLanguage = (lng: string) => {
    // Change the language in i18n
    i18n.changeLanguage(lng);
    
    // Update URL to reflect new language
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentLangCode = pathSegments[0];
    const supportedLanguages = ['en', 'lv', 'ru'];
    
    // If current URL has a language prefix, replace it
    if (supportedLanguages.includes(currentLangCode)) {
      const newPath = `/${lng}${location.pathname.substring(currentLangCode.length + 1) || ''}`;
      navigate(newPath);
    } else {
      // If not, add the language prefix
      navigate(`/${lng}${location.pathname}`);
    }
    
    // Store language preference
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <nav className="fixed w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={`/${i18n.language}`} className="flex items-center">
              <User className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <span className="ml-2 text-xl font-semibold">{t('hero.name')}</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <Navbar 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            i18n={i18n}
            changeLanguage={changeLanguage}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header; 