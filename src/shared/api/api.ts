interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
}

export class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const url = `${endpoint}`;
    console.log(endpoint);
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

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: 'Network Error',
        message: `HTTP ${response.status}`,
        statusCode: response.status,
      }));
      throw new Error(JSON.stringify(error));
    }

    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');

    if (
      response.status === 204 ||
      contentLength === '0' ||
      !contentType?.includes('application/json')
    ) {
      return undefined as T;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body: data });
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body: data });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
