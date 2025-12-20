/**
 * API Client using Next.js fetch with TypeScript
 * Based on Next.js official documentation and best practices
 */

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

    // Build URL with query parameters
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

    // Introduce a 5-second delay before the fetch call
    await new Promise(resolve => setTimeout(resolve, 5000));

    try {
      const response = await fetch(url, {
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        ...restConfig,
      })

      const status = response.status

      // Handle empty responses (204 No Content)
      if (status === 204) {
        return { status }
      }

      // Parse JSON response
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

  /**
   * GET request
   */
  async get<T = unknown>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
      ...config,
    })
  }

  /**
   * POST request
   */
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

  /**
   * PUT request
   */
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

  /**
   * DELETE request
   */
  async delete<T = unknown>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
      ...config,
    })
  }

  /**
   * Set authorization token
   */
  setAuthToken(token: string) {
    this.defaultHeaders = {
      ...this.defaultHeaders,
      Authorization: `Bearer ${token}`,
    }
  }

  /**
   * Remove authorization token
   */
  removeAuthToken() {
    const { Authorization: _Authorization, ...rest } = this.defaultHeaders as Record<string, string>
    this.defaultHeaders = rest
  }
}

// Export singleton instance
export const api = new ApiClient()

// Export class for creating custom instances
export default ApiClient
