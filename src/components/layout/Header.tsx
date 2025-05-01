import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={`/${i18n.language}`} className="flex items-center">
              <User className="h-7 w-7 text-primary-500 dark:text-primary-400" />
              <span className="ml-2 text-xl font-semibold">{t('hero.name')}</span>
            </Link>
          </div>
          
          {/* Navigation */}
          <Navbar 
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header; 