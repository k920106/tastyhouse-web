import { cookies } from 'next/headers'

type RequestConfig = RequestInit & {
  params?: Record<string, string | number | boolean>
}

interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  status: number
}

class ApiClient {
  private baseURL: string
  private defaultHeaders: HeadersInit

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || '') {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { params, headers, ...restConfig } = config
    const cookieStore = await cookies()

    let url = `${this.baseURL}${endpoint}`
    if (params) {
      const queryString = new URLSearchParams(
        Object.entries(params).reduce(
          (acc, [key, value]) => {
            acc[key] = String(value)
            return acc
          },
          {} as Record<string, string>,
        ),
      ).toString()
      url += `?${queryString}`
    }

    try {
      const accessToken = cookieStore.get('accessToken')?.value

      if (accessToken) {
        this.setAuthToken(accessToken)
      }

      const response = await fetch(url, {
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        ...restConfig,
      })

      const status = response.status
      const data = await response.json().catch(() => null)

      if (!response.ok) {
        return {
          error: data?.message || response.statusText || 'An error occurred',
          status,
        }
      }

      return { data, status }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 0,
      }
    }
  }

  async get<T = unknown>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...config,
    })
  }

  async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    })
  }

  async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    })
  }

  async delete<T = unknown>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    })
  }

  setAuthToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    }
  }
}

export const api = new ApiClient()
export default ApiClient
