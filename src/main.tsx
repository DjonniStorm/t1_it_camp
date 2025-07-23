import { QueryProvider, Router, ThemeProvider } from '@app/providers';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import '@app/styles/index.css';
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
);
