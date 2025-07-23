import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { MainPage } from '@pages/main';
import { TaskEditPage } from '@pages/task/edit';
import { TaskCreatePage } from '@pages/task/create';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/task/new', element: <TaskCreatePage /> },
  { path: '/task/:id', element: <TaskEditPage /> },
  { path: '*', element: <Navigate to={'/'} /> },
]);

export const Router = () => <RouterProvider router={router} />;
