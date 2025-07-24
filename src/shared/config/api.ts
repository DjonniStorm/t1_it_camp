export const API_BASE_URL = 'https://todo-back-pbso.onrender.com';
// export const API_BASE_URL = 'http://localhost:3000';
const defaultTasksUrl = '/api/tasks';

export const AVAILABLE_ENDPOINTS = {
  default: defaultTasksUrl,
  byId: (id: string) => `${defaultTasksUrl}/${id}`,
  healthCheck: '/health-check',
} as const;
