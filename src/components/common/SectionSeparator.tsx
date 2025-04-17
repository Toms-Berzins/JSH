import React from 'react';

interface SectionSeparatorProps {
  className?: string;
}

const SectionSeparator: React.FC<SectionSeparatorProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-16 md:h-24 ${className}`}>
      {/* Curved shape using SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        {/* Subtle curve - adjust Q path for different curve shapes */}
        <path 
          className="text-gray-50 dark:text-gray-800" // Color matching the background transition
          d="M0,100 C480,0 960,0 1440,100 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
};

export default SectionSeparator; 