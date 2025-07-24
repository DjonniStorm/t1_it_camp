import { tasksApi } from '@shared/api';
import { queryClient } from '@shared/lib';
import type { Task } from '@shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';

const QUERY_KEY = 'tasks';

const useTasks = () =>
  useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async ({ signal }) => {
      return tasksApi.getTasks(signal);
    },
  });

const useTaskById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: async ({ signal }) => {
      return tasksApi.getTaskById(id, signal);
    },
    enabled: !!id,
  });
};
const useAddTask = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, 'add'],
    mutationFn: async (task: Task) => {
      return tasksApi.createTask(task);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY],
        refetchType: 'active',
      });
    },
  });
};

const useUpdateTask = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, 'update'],
    mutationFn: async ({ id, task }: { id: string; task: Partial<Task> }) => {
      return tasksApi.updateTask(id, task);
    },
    onSuccess: async (data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY],
          refetchType: 'active',
        }),
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY, variables.id],
          refetchType: 'active',
        }),
      ]);
    },
  });
};

const useDeleteTask = () => {
  return useMutation({
    mutationKey: [QUERY_KEY, 'delete'],
    mutationFn: async (id: string) => {
      return tasksApi.deleteTask(id);
    },
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY],
          refetchType: 'active',
        }),
        queryClient.removeQueries({
          queryKey: [QUERY_KEY, variables],
        }),
      ]);
    },
  });
};

export { useTasks, useTaskById, useAddTask, useUpdateTask, useDeleteTask };
