import React from 'react';
import { User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <nav className="fixed w-full backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <User className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-xl font-semibold">My Portfolio</span>
          </div>
          <div className="flex space-x-2">
            <a href="#contact" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header; 