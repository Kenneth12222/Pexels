import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import { PexelProvider } from './context/PexelContext.js'; 

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

// Wrapping the App component with PexelProvider
root.render(
  <React.StrictMode>
    <PexelProvider>
      <App />
    </PexelProvider>
  </React.StrictMode>
);

// Cleanup logic when needed (e.g., unmounting)
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    root.unmount(); // Unmount the React tree
    console.log('React tree unmounted and cleanup performed.');
  });
}
