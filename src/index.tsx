import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import SystemError from './components/pages/error/system-error';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './configs/react-query';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary fallback={<SystemError />}>
            <App />
          </ErrorBoundary>
        </QueryClientProvider>
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
);
