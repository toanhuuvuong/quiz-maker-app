import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import App from './App';
import { SystemError } from './components/pages/error';
import { queryClient } from './configs/react-query';
import './index.css';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ErrorBoundary fallback={<SystemError />}>
            <App />
          </ErrorBoundary>
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
