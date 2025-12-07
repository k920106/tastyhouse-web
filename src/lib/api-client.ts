interface ApiClientOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: unknown
  headers?: Record<string, string>
  timeout?: number
}

export class ApiClient {
  private static getBaseUrl(): string {
    // 서버 사이드에서는 완전한 URL 필요
    if (typeof window === 'undefined') {
      return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
    }
    // 클라이언트 사이드에서는 상대 경로 사용 (rewrites가 처리)
    return ''
  }

  static async request<T = unknown>(endpoint: string, options: ApiClientOptions = {}): Promise<T> {
    const { method = 'GET', body, headers = {}, timeout = 10000 } = options

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const config: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      } as HeadersInit,
      signal: controller.signal,
    }

    if (body) {
      if (body instanceof FormData) {
        const configHeaders = config.headers as Record<string, string>
        delete configHeaders['Content-Type']
        config.body = body
      } else {
        config.body = JSON.stringify(body)
      }
    }

    try {
      const baseUrl = this.getBaseUrl()
      const url = baseUrl ? `${baseUrl}/api${endpoint}` : `/api${endpoint}`
      const response = await fetch(url, config)

      // 타임아웃 클리어
      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
        } catch {
          // JSON 파싱 실패 시 기본 에러 메시지 사용
        }
        throw new Error(errorMessage)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      }

      return (await response.text()) as T
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`)
        }
        console.error('API Request failed:', error)
        throw error
      }

      throw new Error('Unknown API error occurred')
    }
  }

  static async get<T = unknown>(
    endpoint: string,
    params?: Record<string, string | number | boolean | undefined>,
    headers?: Record<string, string>,
    timeout?: number,
  ): Promise<T> {
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url = `${endpoint}?${queryString}`
      }
    }
    return this.request<T>(url, { method: 'GET', headers, timeout })
  }

  static async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
    timeout?: number,
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, headers, timeout })
  }

  static async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
    timeout?: number,
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers, timeout })
  }

  static async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>,
    timeout?: number,
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers, timeout })
  }

  static async delete<T = unknown>(
    endpoint: string,
    headers?: Record<string, string>,
    timeout?: number,
  ): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', headers, timeout })
  }
}
