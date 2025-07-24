import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount: number, error: unknown): boolean => {
        console.warn('queries error: ', failureCount, error);
        return failureCount < 3;
      },
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
      refetchOnMount: true,
      staleTime: 1000 * 30,
    },
    mutations: {
      retry: (failureCount: number, error: unknown): boolean => {
        console.warn('mutations error: ', failureCount, error);
        return failureCount < 3;
      },
    },
  },
});
