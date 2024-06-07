import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import SystemError from './components/pages/error/system-error';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <ErrorBoundary fallback={<SystemError />}>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </React.StrictMode>
);
