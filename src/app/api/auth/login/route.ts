import { post } from '@/lib/api-fetch'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

interface JwtResponse {
  accessToken: string
  refreshToken: string
  tokenType: string
}

export async function POST(request: Request) {
  const cookieStore = await cookies()

  const { username, password } = await request.json()

  if (!username || !password) {
    return NextResponse.json({ message: '아이디와 비밀번호를 모두 입력해주세요.' }, { status: 400 })
  }

  try {
    const data = await post<JwtResponse>('/api/auth/login', { username, password })

    if (data?.accessToken) {
      cookieStore.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      })
      cookieStore.set('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })

      return NextResponse.json({ message: '로그인 성공' }, { status: 200 })
    } else {
      // This case might not be reached if post() throws an error on non-ok status
      return NextResponse.json({ message: '인증에 실패했습니다.' }, { status: 401 })
    }
  } catch (error) {
    console.error('[API Login Route] 로그인 실패:', error)
    return NextResponse.json(
      { message: '아이디 또는 비밀번호가 일치하지 않습니다.' },
      { status: 401 },
    )
  }
}
