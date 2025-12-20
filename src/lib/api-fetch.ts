import { cache } from 'react'
import 'server-only'

// API 응답 타입
interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

// Fetch 옵션 타입
interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>
}

// 기본 API URL 설정
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// 에러 처리 함수
class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string,
  ) {
    super(message || statusText)
    this.name = 'ApiError'
  }
}

// URL 파라미터 생성
function createQueryString(params?: Record<string, string | number | boolean>): string {
  if (!params) return ''
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    searchParams.append(key, String(value))
  })
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

// 기본 fetch 래퍼
async function baseFetch<T>(endpoint: string, options?: FetchOptions): Promise<T> {
  const { params, headers, ...restOptions } = options || {}

  const url = `${API_BASE_URL}${endpoint}${createQueryString(params)}`

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  }

  try {
    const response = await fetch(url, {
      ...restOptions,
      headers: defaultHeaders,
    })

    if (!response.ok) {
      throw new ApiError(
        response.status,
        response.statusText,
        `API Error: ${response.status} ${response.statusText}`,
      )
    }

    // 204 No Content 처리
    if (response.status === 204) {
      return {} as T
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new Error(`Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// GET 요청 (cache 적용)
export const get = cache(
  async <T>(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>): Promise<T> => {
    return baseFetch<T>(endpoint, {
      ...options,
      method: 'GET',
    })
  },
)

// POST 요청
export async function post<T, D = unknown>(
  endpoint: string,
  data?: D,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  })
}

// PUT 요청
export async function put<T, D = unknown>(
  endpoint: string,
  data?: D,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  })
}

// DELETE 요청
export async function del<T>(
  endpoint: string,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: 'DELETE',
  })
}

// Preload 패턴 (병렬 데이터 페칭용)
export function preloadGet(endpoint: string, options?: Omit<FetchOptions, 'method' | 'body'>) {
  void get(endpoint, options)
}

// Next.js cache 옵션을 사용하는 GET 요청
export async function getWithRevalidate<T>(
  endpoint: string,
  revalidate: number | false,
  options?: Omit<FetchOptions, 'method' | 'body'>,
): Promise<T> {
  return baseFetch<T>(endpoint, {
    ...options,
    method: 'GET',
    next: { revalidate },
  })
}

// 타입 익스포트
export type { ApiError, ApiResponse, FetchOptions }
