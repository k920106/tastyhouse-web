'use client'

import { loginAndRedirect } from '@/app/login/action'
import type { LoginParams } from '@/domains/member'
import { useActionState } from 'react'

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: unknown, formData: FormData) => {
      const username = formData.get('username')?.toString() || ''
      const password = formData.get('password')?.toString() || ''
      const params = { username, password } satisfies LoginParams
      return await loginAndRedirect(params)
    },
    null,
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">로그인</h1>
        {state && !state.success && (
          <div className="p-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
            {state.error}
          </div>
        )}
        <form action={formAction} className="space-y-6">
          <div>
            <label htmlFor="username" className="block mb-2 text-sm text-gray-700">
              아이디
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="아이디를 입력하세요"
              required
              minLength={3}
              className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-700">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              required
              minLength={6}
              className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="w-full px-5 py-2.5 text-sm text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400"
          >
            {isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}
