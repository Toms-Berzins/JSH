import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'ru', name: 'Русский' }
];

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLanguageChange = (langCode: string) => {
    // Change i18n language
    i18n.changeLanguage(langCode);
    
    // Store in localStorage
    localStorage.setItem('i18nextLng', langCode);
    
    // Update URL to reflect new language
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const currentLangCode = pathSegments[0];
    const supportedLanguages = ['en', 'lv', 'ru'];
    
    // If current URL has a language prefix, replace it
    if (supportedLanguages.includes(currentLangCode)) {
      const newPath = `/${langCode}${location.pathname.substring(currentLangCode.length + 1) || ''}`;
      navigate(newPath);
    } else {
      // If not, add the language prefix
      navigate(`/${langCode}${location.pathname}`);
    }
    
    // Close dropdown
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium rounded-md"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4" />
        <span>{i18n.language?.toUpperCase()}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white dark:bg-gray-800">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  i18n.language === lang.code
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 