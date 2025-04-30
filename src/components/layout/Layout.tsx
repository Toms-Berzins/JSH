import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-white to-primary-500/10 dark:from-gray-900 dark:to-primary-500/20 transition-colors duration-300 text-gray-800 dark:text-gray-200`}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout; 