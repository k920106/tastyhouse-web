import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { PAGE_PATHS } from '@/lib/paths'
import { ApiResponse } from '@/types/api/api'
import { MemberRankItem, RankMemberQuery, RankPeriod, rankPeriodToRankType } from '@/types/api/rank'
import Link from 'next/link'
import RankItem from './RankItem'

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

export function RankListSkeletonItem() {
  return (
    <>
      <div className="flex gap-2.5">
        <div className="flex flex-col items-center flex-shrink-0 w-[22px]">
          <Skeleton className="w-4 h-3" />
        </div>
        <div className="flex-shrink-0">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <Skeleton className="w-30 h-5" />
          <div className="flex items-center gap-[5px]">
            <Skeleton className="w-5 h-4" />
            <Skeleton className="w-15 h-3" />
          </div>
        </div>
      </div>
      <Skeleton className="w-10 h-3" />
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
    API_ENDPOINTS.RANK_MEMBERS,
    query,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data || !data?.success || !data.data) {
    return <ErrorMessage message={COMMON_ERROR_MESSAGES.FETCH_ERROR('랭킹')} />
  }

  const memberRankItems = data.data

  if (memberRankItems.length === 0) {
    return (
      <div className="w-full text-sm leading-[14px] text-[#999999] text-center whitespace-pre-line">
        랭킹 데이터가 없습니다.
      </div>
    )
  }

  return memberRankItems.map((item) => (
    <Link key={item.memberId} href={PAGE_PATHS.MEMBER_DETAIL(item.memberId)}>
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
}
