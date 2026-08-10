import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppProviders from './app/providers/AppProviders';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
