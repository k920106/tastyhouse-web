import { Suspense } from 'react'
import ReviewTabs from './_components/ReviewTabs'

// ✅ Next.js 공식 권장사항에 따라 useSearchParams를 사용하는 컴포넌트를 Suspense로 감쌌습니다

export default function ReviewPage() {
  return (
    <Suspense fallback={<div className="h-screen" />}>
      <ReviewTabs />
    </Suspense>
  )
}
