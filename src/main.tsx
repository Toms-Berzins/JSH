import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Restore BrowserRouter
import App from './App.tsx';
import './index.css';

// Import i18n configuration
import './i18n';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/* Restore BrowserRouter */}
      {/* Wrap App with Suspense for loading translations */}
      <React.Suspense fallback="Loading...">
        <App />
      </React.Suspense>
    </BrowserRouter> {/* Restore BrowserRouter */}
  </React.StrictMode>
);
