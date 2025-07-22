// export const API_BASE_URL = 'https://back-gules-chi.vercel.app';
// export const API_BASE_URL = 'https://back-gules-chi.vercel.app';

const defaultTasksUrl = '/api/tasks';

export const AVAILABLE_ENDPOINTS = {
  default: defaultTasksUrl,
  byId: (id: string) => `${defaultTasksUrl}/${id}`,
} as const;
