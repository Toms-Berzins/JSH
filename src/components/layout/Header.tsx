import React from 'react';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'lv', name: 'LV' },
    { code: 'ru', name: 'RU' },
  ];

  return (
    <nav className="fixed w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <User className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold">{t('hero.name')}</span>
          </div>
          <div className="flex items-center space-x-4">
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
            <a href="#contact" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              {t('navbar.contact')}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 