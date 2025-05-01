import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-4">{t('notFound.description')}</p>
        <Link to="/" className="text-blue-600 hover:underline">
          {t('notFound.backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 