import ErrorFallback from '@/components/ui/error-fallback'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/common'
import {
  MemberRankItem,
  PrizeItem,
  RankMemberQuery,
  RankPeriod,
  rankPeriodToRankType,
} from '@/types/api/rank'
import { Suspense } from 'react'
import MyRankSection from './_components/MyRankSection'
import RankSection from './_components/RankSection'
import TopPrizesSection, { TopPrizesSectionLayout } from './_components/TopPrizesSection'
import { retryRankPage } from './actions'

async function Prizelists() {
  // API 호출
  const { error, data } = await api.get<ApiResponse<PrizeItem[]>>('/api/prizes/v1')

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <ErrorFallback
        message={'네트워크 연결이 원활하지 않습니다. 인터넷 상태를 확인해주세요.'}
        showRetry
        onRetry={retryRankPage}
      />
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage =
      data?.message || '경품 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return <ErrorFallback message={errorMessage} showRetry onRetry={retryRankPage} />
  }

  return <TopPrizesSection prizes={data.data} />
}

async function Ranklists({ rankPeriod }: { rankPeriod: RankPeriod }) {
  // API 호출
  const query = {
    params: {
      type: rankPeriodToRankType(rankPeriod),
      limit: 100,
    } satisfies RankMemberQuery,
  }
  const { error, data } = await api.get<ApiResponse<MemberRankItem[]>>(
    '/api/ranks/v1/members',
    query,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <ErrorFallback
        message={'네트워크 연결이 원활하지 않습니다. 인터넷 상태를 확인해주세요.'}
        showRetry
        onRetry={retryRankPage}
      />
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage =
      data?.message || '랭킹 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return <ErrorFallback message={errorMessage} showRetry onRetry={retryRankPage} />
  }

  return <RankSection rankings={data.data} initialTab={rankPeriod} />
}

function TopPrizesSkeletonItem() {
  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="relative w-full mb-[15px] max-w-[144px] aspect-square">
        <Skeleton className="w-full h-full flex items-center justify-center border border-[#eeeeee] rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-2 w-full text-center">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  )
}

function TopPrizesSectionSkeleton() {
  return (
    <TopPrizesSectionLayout>
      {[...Array(3)].map((_, i) => (
        <TopPrizesSkeletonItem key={i} />
      ))}
    </TopPrizesSectionLayout>
  )
}

const isValidRankType = (type: string | undefined): type is RankPeriod => {
  return type === 'all' || type === 'monthly'
}

export default async function RankPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const params = await searchParams
  const rankPeriod: RankPeriod = isValidRankType(params.type) ? params.type : 'all'

  return (
    <>
      <Suspense fallback={<TopPrizesSectionSkeleton />}>
        <Prizelists />
      </Suspense>
      <Suspense
        fallback={
          <div className="p-4 space-y-4 bg-white">
            <div className="flex gap-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
            <div className="space-y-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-6 w-6" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <Ranklists rankPeriod={rankPeriod} />
      </Suspense>
      <MyRankSection />
    </>
  )
}
