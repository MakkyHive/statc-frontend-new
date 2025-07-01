import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { PrivyProvider } from '@privy-io/react-auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <PrivyProvider
      appId="cmbucfjty00e6l80mt8qfhif4"
      config={{
        appearance: {
          theme: 'dark',
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
