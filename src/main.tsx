import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { createRoot } from 'react-dom/client';
import { lazy, StrictMode } from 'react';
import '@mantine/core/styles.css';
import App from './App.tsx';
import './index.css';
import { MainPage } from './pages/main/MainPage.tsx';

const TaskDetailsPage = lazy(() => import('./pages/TaskPage.tsx'));

const routes = createBrowserRouter([
  {
    element: <App />,
    path: '/',
    children: [
      {
        element: <MainPage />,
        index: true,
      },
      {
        path: 'task/:id',
        element: <TaskDetailsPage />,
      },
      {
        path: '*',
        element: <Navigate to={'/'} />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider>
      <RouterProvider router={routes} />
    </MantineProvider>
  </StrictMode>,
);
