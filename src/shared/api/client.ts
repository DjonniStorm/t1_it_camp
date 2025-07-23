import { apiClient } from './api';
import { AVAILABLE_ENDPOINTS } from '@shared/config';
import { TasksArrayScheme, TaskScheme, type Task } from '@shared/types';

export const tasksApi = {
  getTasks: (signal?: AbortSignal): Promise<Task[]> => {
    return apiClient.get(AVAILABLE_ENDPOINTS.default, signal, TasksArrayScheme);
  },

  getTaskById: (id: string, signal?: AbortSignal): Promise<Task> => {
    return apiClient.get(AVAILABLE_ENDPOINTS.byId(id), signal, TaskScheme);
  },

  createTask: (task: Task): Promise<Task> => {
    return apiClient.post(AVAILABLE_ENDPOINTS.default, task, TaskScheme);
  },

  updateTask: (id: string, task: Partial<Task>): Promise<Task> => {
    return apiClient.patch(AVAILABLE_ENDPOINTS.byId(id), task, TaskScheme);
  },

  deleteTask: (id: string): Promise<void> => {
    return apiClient.delete(AVAILABLE_ENDPOINTS.byId(id));
  },
};
