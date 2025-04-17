import React from 'react';

const ModernBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"></div>
      
      {/* Subtle animated gradient overlay */}
      {/* Adjusted colors for more subtlety */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/30 via-transparent to-violet-50/30 dark:from-sky-900/10 dark:via-transparent dark:to-violet-900/10 animate-gradient-x"></div>
      
      {/* Minimalistic pattern */}
      {/* Slightly reduced opacity */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMXYxaC0xeiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9nPjwvc3ZnPg==')] bg-repeat"></div>

      {/* Optional: Decorative blurred elements (kept subtle) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-300/10 dark:bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300/10 dark:bg-purple-600/10 rounded-full blur-3xl"></div>
        </div>
    </div>
  );
};

export default ModernBackground; 