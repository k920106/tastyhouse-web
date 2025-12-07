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
│   │   ├── api-client.ts             # API 클라이언트
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
- 예시: `import { ApiClient } from '@/lib/api-client'`

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
