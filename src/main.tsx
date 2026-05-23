try {
  if (typeof window !== 'undefined') {
    var originalFetch = window.fetch;
    var fetchValue = originalFetch;
    Object.defineProperty(window, 'fetch', {
      get: function() { return fetchValue; },
      set: function(val) { fetchValue = val; },
      configurable: true,
      enumerable: true
    });
  }
} catch (e) {
  console.warn('Could not redefine window.fetch:', e);
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
