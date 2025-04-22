import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // List of supported languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'lv', name: 'Latviešu' },
    { code: 'ru', name: 'Русский' }
  ];
  
  // Handle language change
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    
    // Save language preference in localStorage
    localStorage.setItem('i18nextLng', langCode);
    
    // Update URL with language prefix if using language-based routing
    // This is a placeholder - you may need to implement proper language-based routing
    // depending on your router configuration
    navigate(location.pathname);
  };
  
  return (
    <div className="relative inline-block text-left">
      <div>
        <button 
          type="button" 
          className="inline-flex justify-center w-full rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
          id="language-menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {t('languageSwitcher.changeLanguage')}
          <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="language-menu-button" tabIndex={-1}>
        <div className="py-1" role="none">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`${
                i18n.language === lang.code ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-200'
              } block px-4 py-2 text-sm w-full text-left hover:bg-gray-50 dark:hover:bg-gray-700`}
              role="menuitem"
              tabIndex={-1}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher; 