import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { i18n as I18nType } from 'i18next';
import { scrollToElement } from '../../utils/scrollUtils';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  i18n: I18nType;
  changeLanguage: (lng: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  i18n,
  changeLanguage 
}) => {
  const { t } = useTranslation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Check which section is in view
      const sections = ['hero', 'services', 'portfolio', 'faq', 'contact'];
      
      // Special handling for hero section at the top
      if (window.scrollY < window.innerHeight * 0.3) {
        setActiveSection('home');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = window.innerHeight * 0.3; // 30% of viewport height
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section === 'hero' ? 'home' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'lv', name: 'LV' },
    { code: 'ru', name: 'RU' },
  ];

  // Navigation items
  const navItems = [
    { key: 'home', href: `/${i18n.language}#hero`, label: t('navbar.home') },
    { key: 'services', href: `/${i18n.language}#services`, label: t('navbar.services') },
    { key: 'portfolio', href: `/${i18n.language}#portfolio`, label: t('navbar.portfolio') },
    { key: 'faq', href: `/${i18n.language}#faq`, label: t('navbar.faq') },
  ];
  
  // Check if a nav item is active based on current path
  const isActiveRoute = (key: string) => {
    return activeSection === key;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white dark:bg-gray-900 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-end h-16">
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Nav links */}
            <div className="flex space-x-4">
              {navItems.map(item => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 ${
                    isActiveRoute(item.key)
                      ? 'bg-primary-500 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToElement(item.key === 'home' ? 'hero' : item.key);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* Language switcher with dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 ${
                  isLanguageMenuOpen
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'
                }`}
                aria-label={t('languageSwitcher.changeLanguage')}
                aria-expanded={isLanguageMenuOpen}
              >
                <Globe className="h-4 w-4" />
                <span>{i18n.resolvedLanguage?.toUpperCase() || 'EN'}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isLanguageMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 animate-fadeIn">
                  <div className="py-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${
                          i18n.resolvedLanguage === lang.code
                            ? 'bg-primary-500 text-white'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Contact button */}
            <a 
              href={`/${i18n.language}#contact`}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={(e) => {
                e.preventDefault();
                scrollToElement('contact');
              }}
            >
              {t('navbar.contact')}
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-md transition-all duration-300 hover:scale-105 ${
                mobileMenuOpen
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm'
              }`}
              aria-label={mobileMenuOpen ? t('navbar.closeMenu') : t('navbar.openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-2 pb-4 space-y-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-xl animate-slideDown">
          {navItems.map(item => (
            <a
              key={item.key}
              href={item.href}
              className={`block px-3 py-2 text-base font-medium rounded-md transition-all duration-300 hover:scale-105 ${
                isActiveRoute(item.key)
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80'
              }`}
              onClick={(e) => {
                e.preventDefault();
                scrollToElement(item.key === 'home' ? 'hero' : item.key);
                setMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          
          {/* Mobile contact button */}
          <a
            href={`/${i18n.language}#contact`}
            className="block w-full text-center mt-2 px-4 py-2 text-base font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            onClick={(e) => {
              e.preventDefault();
              scrollToElement('contact');
              setMobileMenuOpen(false);
            }}
          >
            {t('navbar.contact')}
          </a>
          
          {/* Mobile language switcher */}
          <div className="flex space-x-2 mt-3 px-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 hover:scale-105 ${
                  i18n.resolvedLanguage === lang.code
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 