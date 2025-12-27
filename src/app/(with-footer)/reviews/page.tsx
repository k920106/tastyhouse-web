import { ReviewType } from '@/types/api/review'
import LatestReviewList from './_components/LatestReviewList'
import ReviewTabs from './_components/ReviewTabs'

const isValidReviewType = (type: string | undefined): type is 'all' | 'following' => {
  return type === 'all' || type === 'following'
}

const reviewTypeMap: Record<'all' | 'following', ReviewType> = {
  all: 'ALL',
  following: 'FOLLOWING',
}

export default async function ReviewPage({ searchParams }: { searchParams: { type?: string } }) {
  const resolvedSearchParams = await Promise.resolve(searchParams)
  const typeParam = resolvedSearchParams.type

  const clientType: 'all' | 'following' = isValidReviewType(typeParam) ? typeParam : 'all'
  const reviewType: ReviewType = reviewTypeMap[clientType]

  return (
    <>
      <ReviewTabs activeTab={clientType} />
      <LatestReviewList reviewType={reviewType} />
    </>
  )
}
