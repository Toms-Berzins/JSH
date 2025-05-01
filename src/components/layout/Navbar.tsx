import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { scrollToElement } from '../../utils/scrollUtils';
import LanguageSwitcher from '../common/LanguageSwitcher';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen
}) => {
  const { t, i18n } = useTranslation();
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
            
            {/* Language switcher */}
            <LanguageSwitcher />
            
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
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          <div className="mt-2">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 