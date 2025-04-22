import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';

// Potentially add other pages here later (e.g., NotFound, ProjectDetail)

// Language-prefixed routing as described in MULTILINGUAL.md
function App() {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const supportedLanguages = ['en', 'lv', 'ru'];
  
  // Check if the current path has a language prefix
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const currentLangCode = pathSegments[0];
  const isLanguagePrefix = supportedLanguages.includes(currentLangCode);
  
  // Handle language detection and routing
  useEffect(() => {
    // If the URL doesn't have a language prefix, redirect to the preferred language
    if (!isLanguagePrefix) {
      const preferredLanguage = localStorage.getItem('i18nextLng') || i18n.language || 'en';
      const langToUse = supportedLanguages.includes(preferredLanguage) ? preferredLanguage : 'en';
      
      // Update the URL with the language prefix
      const newPath = `/${langToUse}${location.pathname === '/' ? '' : location.pathname}`;
      navigate(newPath, { replace: true });
    } else {
      // Ensure i18n language matches URL language
      if (i18n.language !== currentLangCode) {
        i18n.changeLanguage(currentLangCode);
      }
    }
  }, [location.pathname, i18n, navigate, isLanguagePrefix, currentLangCode]);
  
  return (
    <Layout>
      <Routes>
        {/* Root redirect to language-specific home */}
        <Route path="/" element={<Navigate to={`/${i18n.language || 'en'}`} replace />} />
        
        {/* Language-specific routes */}
        {supportedLanguages.map(lang => (
          <Route key={lang} path={`/${lang}/*`} element={
            <Routes>
              {/* Home page */}
              <Route index element={<Home />} />
              
              {/* Add other content pages here */}
              <Route path="services" element={<Services />} />
              {/* 
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="contact" element={<Contact />} />
              
              And if needed, nested dynamic routes:
              <Route path="portfolio/:projectId" element={<ProjectDetail />} />
              */}
              
              {/* Fallback for nested routes */}
              <Route path="*" element={<Navigate to={`/${lang}`} replace />} />
            </Routes>
          } />
        ))}
        
        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to={`/${i18n.language || 'en'}`} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;