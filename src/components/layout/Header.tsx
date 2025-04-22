import React, { useState } from 'react';
import { User, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';

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

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'lv', name: 'LV' },
    { code: 'ru', name: 'RU' },
  ];

  // Navigation items
  const navItems = [
    { key: 'home', href: `/${i18n.language}`, label: t('navbar.home') },
    { key: 'services', href: `/${i18n.language}/services`, label: t('navbar.services') },
    { key: 'portfolio', href: `/${i18n.language}/portfolio`, label: t('navbar.portfolio') },
    { key: 'faq', href: `/${i18n.language}/faq`, label: t('navbar.faq') },
  ];
  
  // Check if a nav item is active based on current path
  const isActiveRoute = (path: string) => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    if (pathSegments.length <= 1) {
      // Home page
      return path === `/${pathSegments[0]}`;
    }
    return path.includes(`/${pathSegments[0]}/${pathSegments[1]}`);
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
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Nav links */}
            <div className="flex space-x-4 mr-4">
              {navItems.map(item => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActiveRoute(item.href)
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            
            {/* Language switcher */}
            <div className="flex space-x-1 border border-gray-300 dark:border-gray-700 rounded-full p-0.5">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${ 
                    i18n.resolvedLanguage === lang.code
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  aria-label={`${t('languageSwitcher.changeLanguage')} ${lang.name}`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
            
            {/* Contact button */}
            <Link 
              to={`/${i18n.language}/contact`} 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              {t('navbar.contact')}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.key}
                to={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActiveRoute(item.href)
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile contact button */}
            <Link
              to={`/${i18n.language}/contact`}
              className="block w-full text-center mt-2 px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('navbar.contact')}
            </Link>
            
            {/* Mobile language switcher */}
            <div className="flex space-x-2 mt-3 px-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${ 
                    i18n.resolvedLanguage === lang.code
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header; 