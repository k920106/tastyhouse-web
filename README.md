# TastyHouse Web

Next.js 기반의 웹 애플리케이션입니다.

## 프로젝트 구조

```
tastyhouse-web/
├── src/                              # 소스 코드 (권장 사항)
│   ├── app/                          # App Router (라우팅 전용)
│   │   ├── (home)/                   # Route Group - 홈
│   │   │   ├── _components/          # 홈 전용 컴포넌트 (Private Folder)
│   │   │   │   └── BannerSection.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   │
│   │   ├── map/                      # 지도 페이지
│   │   │   └── page.tsx
│   │   │
│   │   ├── reviews/                  # 리뷰 페이지
│   │   │   └── create/
│   │   │       └── page.tsx
│   │   │
│   │   └── layout.tsx                # Root Layout
│   │
│   ├── components/                   # 재사용 컴포넌트
│   │   ├── ui/                       # 기본 UI 컴포넌트
│   │   ├── forms/                    # 폼 컴포넌트
│   │   ├── layouts/                  # 레이아웃 컴포넌트
│   │   ├── home/                     # 홈 관련 공용 컴포넌트
│   │   │   ├── KakaoMap.tsx
│   │   │   ├── ReviewButton.tsx
│   │   │   ├── SideBarButton.tsx
│   │   │   └── SideBar.tsx
│   │   └── reviews/                  # 리뷰 관련 공용 컴포넌트
│   │       ├── SubmitButton.tsx
│   │       ├── TagInput.tsx
│   │       ├── ReviewInput.tsx
│   │       └── PhotoUploader.tsx
│   │
│   ├── lib/                          # 유틸리티 & 설정
│   │   ├── api.ts                    # API 클라이언트
│   │   └── places.ts                 # 장소 관련 유틸리티
│   │
│   ├── hooks/                        # Custom React Hooks
│   │
│   ├── types/                        # TypeScript 타입 정의
│   │   └── api/                      # API 관련 타입
│   │       ├── banner.ts
│   │       ├── common.ts
│   │       └── place.ts              # 장소 타입
│   │
│   └── styles/                       # 글로벌 스타일
│       └── globals.css
│
├── public/                           # 정적 파일
│   ├── images/
│   ├── font/
│   └── favicon.ico
│
├── .vscode/                          # VS Code 설정
├── .env                              # 환경 변수
├── next.config.ts                    # Next.js 설정
├── tsconfig.json                     # TypeScript 설정
├── tailwind.config.ts                # Tailwind CSS 설정
└── package.json
```

### 주요 구조 특징

#### 1. `src/` 폴더 사용 ✅

- 애플리케이션 코드와 설정 파일을 분리
- 프로젝트가 깔끔하고 체계적으로 유지됨
- `tsconfig.json`의 paths 설정: `@/*` → `./src/*`

#### 2. Route Groups 활용

- `(home)`, `(auth)` 등 괄호로 그룹화
- URL에 영향 없이 레이아웃을 다르게 적용 가능
- 관련 라우트를 논리적으로 구조화

#### 3. Private Folders (`_폴더명`)

- `_components`, `_lib`, `_utils` 등
- 라우팅에서 제외되며, 내부 구현 전용
- 해당 라우트 그룹에서만 사용되는 컴포넌트

#### 4. Colocation 전략

**현재 적용된 방식**: 기능별 분리 (중소규모 프로젝트)

```
src/
├── app/              # 라우팅만
├── components/       # 공통 컴포넌트
├── lib/             # 공통 유틸리티
└── hooks/           # 공통 훅
```

**향후 대규모 프로젝트 시 권장 방식**:

```
src/
├── app/
│   ├── (dashboard)/
│   │   ├── _components/    # 대시보드 전용 컴포넌트
│   │   ├── _lib/           # 대시보드 전용 유틸
│   │   └── page.tsx
├── components/             # 공통 컴포넌트
└── lib/                    # 공통 유틸
```

#### 5. 파일명 컨벤션

- `page.tsx` - 페이지
- `layout.tsx` - 레이아웃
- `loading.tsx` - 로딩 UI
- `error.tsx` - 에러 UI
- `not-found.tsx` - 404 페이지
- `route.ts` - API 라우트

### Import 경로

- 절대 경로 사용: `@/` → `src/` 폴더
- 예시: `import { api } from '@/lib/api'`

## API 클라이언트 사용법

프로젝트는 TypeScript 기반의 fetch API 클라이언트를 제공합니다. ([src/lib/api.ts](src/lib/api.ts))

### 참고 문서

https://nextjs.org/docs/app/api-reference/functions/fetch  
https://nextjs.org/docs/app/getting-started/fetching-data  
https://github.com/elbywan/wretch

### 기본 사용법

```typescript
import { api } from '@/lib/api'

// GET 요청
const { data, error, status } = await api.get<User[]>('/users')

if (error) {
  console.error('Error:', error)
} else {
  console.log('Users:', data)
}
```

### 지원하는 HTTP 메서드

#### GET 요청

```typescript
// 기본 GET
const { data } = await api.get<User>('/users/1')

// Query Parameters 사용
const { data } = await api.get<User[]>('/users', {
  params: { page: 1, limit: 10, sort: 'name' },
})
// 실제 요청: /users?page=1&limit=10&sort=name
```

#### POST 요청

```typescript
const { data, error } = await api.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com',
})
```

#### PUT 요청

```typescript
const { data } = await api.put<User>('/users/1', {
  name: 'Jane Doe',
  email: 'jane@example.com',
})
```

#### DELETE 요청

```typescript
const { data } = await api.delete('/users/1')
```

### 인증 토큰 관리

```typescript
// 로그인 후 토큰 설정
const { data } = await api.post<{ token: string }>('/auth/login', {
  email: 'user@example.com',
  password: 'password123',
})

if (data?.token) {
  api.setAuthToken(data.token)
  // 이후 모든 요청에 Authorization: Bearer {token} 헤더가 자동으로 추가됩니다
}

// 로그아웃 시 토큰 제거
api.removeAuthToken()
```

### 커스텀 헤더 사용

```typescript
const { data } = await api.get('/users', {
  headers: {
    'X-Custom-Header': 'value',
  },
})
```

### 타입 안전성

API 응답 타입을 제네릭으로 지정할 수 있습니다:

```typescript
// 타입 정의
interface User {
  id: number
  name: string
  email: string
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
}

// 타입 안전한 API 호출
const { data } = await api.get<PaginatedResponse<User>>('/users', {
  params: { page: 1 },
})

// data는 자동으로 PaginatedResponse<User> 타입으로 추론됩니다
console.log(data?.items[0].name)
```

### 에러 핸들링

```typescript
const { data, error, status } = await api.get('/users')

if (error) {
  if (status === 404) {
    console.log('리소스를 찾을 수 없습니다')
  } else if (status === 401) {
    console.log('인증이 필요합니다')
  } else if (status === 0) {
    console.log('네트워크 오류가 발생했습니다')
  } else {
    console.log('오류:', error)
  }
}
```

### Server Component에서 사용

```typescript
// app/users/page.tsx
import { api } from '@/lib/api'

interface User {
  id: number
  name: string
}

export default async function UsersPage() {
  const { data, error } = await api.get<User[]>('/users')

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <ul>
      {data?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### Client Component에서 사용

```typescript
'use client'

import { api } from '@/lib/api'
import { useEffect, useState } from 'react'

interface User {
  id: number
  name: string
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await api.get<User[]>('/users')
      if (data) setUsers(data)
      setLoading(false)
    }
    fetchUsers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
```

### 환경 변수 설정

`.env.local` 파일에 API URL을 설정하세요:

```bash
NEXT_PUBLIC_API_URL=https://api.example.com
```

또는 코드에서 커스텀 인스턴스를 생성할 수 있습니다:

```typescript
import ApiClient from '@/lib/api'

const customApi = new ApiClient('https://api.custom.com')
const { data } = await customApi.get('/endpoint')
```

## 개발 환경 설정

### 필수 확장 프로그램

- Prettier - Code formatter
- ESLint
- TypeScript and JavaScript Language Features

### 코드 품질 관리

```bash
# 코드 린팅 및 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check

# 전체 코드 품질 검사
npm run code-quality
```

### VS Code 설정

프로젝트에 포함된 `.vscode/settings.json`이 자동으로 적용됩니다:

- 저장 시 자동 포맷팅
- ESLint 자동 수정
- TypeScript 자동 import

## 개발 서버 실행

```bash
npm run dev
```

## 빌드

```bash
npm run build
npm start
```

Empty / Error 상태 메시지 마크업 기준  
UI에서 데이터가 없거나(Error, Empty State) 상태 메시지를 표시할 때는 p나 span 대신 div를 사용한다.  
이는 해당 메시지가 문단(paragraph)이 아닌 레이아웃을 포함한 UI 상태 블록이며, padding, 정렬, 추후 버튼·아이콘 추가 등 확장 가능성을 고려한 선택이다.  
p 태그는 설명용 문장에, span 태그는 문장 내부의 인라인 텍스트 강조에만 사용한다.
