import { API_BASE_URL } from '@shared/config';
import type { z } from 'zod/v4';
import { ApiErrorScheme } from '@shared/types';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

export class ApiClient {
  private async request<T>(
    endpoint: string,
    ac: AbortSignal | undefined,
    options: RequestOptions = {},
    responseScheme?: z.ZodType<T>,
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    const response = await fetch(url, { ...config, signal: ac });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Network Error',
      }));

      const validatedError = ApiErrorScheme.safeParse(error);
      const errorMessage = validatedError.success
        ? validatedError.data.error
        : 'Unknown error';

      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      return undefined as T;
    }

    const data = await response.json();

    if (responseScheme) {
      return responseScheme.parse(data);
    }

    return data;
  }

  async get<T>(
    endpoint: string,
    signal: AbortSignal | undefined,
    responseScheme: z.ZodType<T>,
  ): Promise<T> {
    return this.request<T>(endpoint, signal, { method: 'GET' }, responseScheme);
  }

  async post<T>(
    endpoint: string,
    data: unknown,
    responseScheme: z.ZodType<T>,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      undefined,
      { method: 'POST', body: data },
      responseScheme,
    );
  }

  async patch<T>(
    endpoint: string,
    data: unknown,
    responseScheme: z.ZodType<T>,
  ): Promise<T> {
    return this.request<T>(
      endpoint,
      undefined,
      { method: 'PATCH', body: data },
      responseScheme,
    );
  }

  async delete(endpoint: string): Promise<void> {
    return this.request<void>(endpoint, undefined, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
