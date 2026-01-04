import CommentInputSection from './_components/CommentInputSection'
import CommentListSection from './_components/CommentListSection'
import { ReplyProvider } from './_components/ReplyContext'
import ReviewDetailHeaderSection from './_components/ReviewDetailHeaderSection'
import ReviewInfoSection from './_components/ReviewInfoSection'

interface ReviewDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ReviewDetailPage({ params }: ReviewDetailPageProps) {
  return (
    <ReplyProvider>
      <ReviewDetailHeaderSection params={params} />
      <div className="pb-20">
        <ReviewInfoSection params={params} />
        <CommentListSection params={params} />
      </div>
      <CommentInputSection params={params} />
    </ReplyProvider>
  )
}

/**
 * Next.js Suspense 스트리밍을 위해 params를 Promise로 받아야 합니다.
 *
 * ❌ 잘못된 방법:
 * - 부모에서 `await params` 후 reviewId를 추출하여 전달
 * - 결과: 부모의 async 작업이 완료될 때까지 전체 렌더링 대기
 * - Suspense boundary가 활성화되지 않아 스켈레톤 UI가 표시되지 않음
 *
 * ✅ 올바른 방법:
 * - params Promise를 그대로 전달
 * - Suspense boundary 내부(ReviewInfoContent)에서 await params 실행
 * - 결과: 컴포넌트가 즉시 스트리밍되어 스켈레톤 UI가 먼저 표시됨
 *
 * 참고: PrizeListSection처럼 props가 없으면 자동으로 스트리밍되지만,
 * 동적 세그먼트([id])가 필요한 경우 params Promise를 Suspense 내부로 전달해야 합니다.
 */
