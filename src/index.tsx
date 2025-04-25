import './global.css';

import { render } from 'solid-js/web';
import App from './App';

const root = document.getElementById('root');
if (root) {
  render(() => <App />, root);
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .catch((err) => console.error('SW registration failed:', err));
  });
}
