import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend'; // Use HttpApi instead of Backend

i18n
  // Use HttpApi to load translations. It expects translations to be in /public/locales/<lng>/translation.json
  // Learn more: https://github.com/i18next/i18next-http-backend
  .use(HttpApi)
  // Detect user language
  // Learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Initialize i18next
  // For all options read: https://www.i18next.com/overview/configuration-options
  .init({
    supportedLngs: ['en', 'lv', 'ru'], // Explicitly list supported languages
    fallbackLng: 'en', // Use English if detected language is not available
    debug: true, // Set to false in production
    // Specify where translations are stored
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    // Options for language detection
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie', 'localStorage'], // Cache the language in cookie and local storage
    },
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n; 