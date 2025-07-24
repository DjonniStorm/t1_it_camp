import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { MainPage } from '@pages/main';
import { TaskEditPage } from '@pages/task/edit';
import { TaskCreatePage } from '@pages/task/create';
import { useHealthCheck } from '@app/hooks/use-health-check';
import { Flex } from '@mantine/core';
import { Loading } from '@shared/ui';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/task/new', element: <TaskCreatePage /> },
  { path: '/task/:id', element: <TaskEditPage /> },
  { path: '*', element: <Navigate to={'/'} /> },
]);

export const Router = () => {
  const { isError, isPending, isLoading } = useHealthCheck();

  if (isPending || isLoading) {
    return (
      <>
        <Flex className="flex-1" justify="center" align="center">
          <Loading text="Render запускает сервер" isSadImageAllow />
        </Flex>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Flex>
          <Loading text="Сервер сломался" isSadImageAllow />
        </Flex>
      </>
    );
  }

  return <RouterProvider router={router} />;
};
