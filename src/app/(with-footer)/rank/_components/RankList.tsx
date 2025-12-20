import ErrorFallback from '@/components/ui/error-fallback'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/common'
import { MemberRankItem, RankMemberQuery, RankPeriod, rankPeriodToRankType } from '@/types/api/rank'
import Link from 'next/link'
import { retryRankPage } from '../actions'
import RankItem from './RankItem'

export function RankListSkeletonItem() {
  return (
    <>
      <div className="flex items-center gap-2.5">
        <div className="flex flex-col items-center flex-shrink-0 w-[22px]">
          <Skeleton className="w-4 h-3" />
        </div>
        <div className="flex-shrink-0">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="flex items-center gap-[5px]">
            <Skeleton className="w-5 h-4" />
            <Skeleton className="w-15 h-3" />
          </p>
        </div>
      </div>
      <Skeleton className="w-10 h-3" />
    </>
  )
}

export function RankListSkeleton() {
  return (
    <>
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="flex justify-between items-center py-[15px] pl-4 pr-5 bg-[#fcfcfc] border border-[#eeeeee] rounded-[2.5px]"
        >
          <RankListSkeletonItem />
        </div>
      ))}
    </>
  )
}

export default async function RankList({ rankPeriod }: { rankPeriod: RankPeriod }) {
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

  const list = data.data

  return (
    <>
      {data.data.length === 0 ? (
        <div className="py-10 text-[#999999] text-center">랭킹 데이터가 없습니다.</div>
      ) : (
        list.map((item) => (
          <Link key={item.memberId} href={`/members/${item.memberId}`}>
            <div className="flex justify-between items-center py-[15px] pl-4 pr-5 bg-[#fcfcfc] border border-[#eeeeee] rounded-[2.5px]">
              <RankItem
                rankNo={item.rankNo}
                profileImageUrl={item.profileImageUrl}
                nickname={item.nickname}
                grade={item.grade}
                reviewCount={item.reviewCount}
              />
            </div>
          </Link>
        ))
      )}
    </>
  )
}
