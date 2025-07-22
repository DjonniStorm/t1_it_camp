import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@app/providers/Mantine';
import { Router } from '@app/providers/Router';
import { queryClient } from '@shared/lib';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import React from 'react';
import '@app/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
