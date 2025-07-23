import { apiClient } from './api';
import { AVAILABLE_ENDPOINTS } from '@shared/config';
import type { Task } from '@shared/types';

export const tasksApi = {
  getTasks: (): Promise<Task[]> => {
    return apiClient.get<Task[]>(AVAILABLE_ENDPOINTS.default);
  },

  getTaskById: (id: string): Promise<Task> => {
    return apiClient.get<Task>(AVAILABLE_ENDPOINTS.byId(id));
  },

  createTask: (data: Task): Promise<Task> => {
    return apiClient.post<Task>(AVAILABLE_ENDPOINTS.default, data);
  },

  updateTask: (data: Task): Promise<Task> => {
    return apiClient.put<Task>(AVAILABLE_ENDPOINTS.default, data);
  },

  deleteTask: (id: string): Promise<void> => {
    return apiClient.delete<void>(AVAILABLE_ENDPOINTS.byId(id));
  },
};
