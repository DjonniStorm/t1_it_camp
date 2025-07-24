import { apiClient } from '@shared/api';
import { AVAILABLE_ENDPOINTS } from '@shared/config';
import { useQuery } from '@tanstack/react-query';
import z from 'zod/v4';

export const useHealthCheck = () => {
  const { data, isLoading, isError, isPending } = useQuery({
    queryKey: ['health-check'],
    queryFn: async () => {
      return await apiClient.get(
        AVAILABLE_ENDPOINTS.healthCheck,
        undefined,
        z.any(),
      );
    },
    retry: (failureCount) => {
      return failureCount < 20;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
    refetchInterval: (query) => {
      console.log(query);
      if (query.state.data) {
        return 1000 * 60 * 5; // 5 минут
      }
      return 1000 * 10; // 10 секунд
    },
    refetchIntervalInBackground: false,
    refetchOnReconnect: true,
  });

  return {
    isServerAvailable: !!data && !isError,
    isError,
    healthCheck: data,
    isPending,
    isLoading,
  };
};
