import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { ApiResponse } from '@/types/api/common'
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
      <div className="flex items-center gap-2.5">
        <div className="flex flex-col items-center flex-shrink-0 w-[22px]">
          <Skeleton className="w-4 h-3" />
        </div>
        <div className="flex-shrink-0">
          <Skeleton className="w-10 h-10 rounded-full" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
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
    '/api/ranks/v1/members',
    query,
  )

  // Expected Error: API 호출 실패 (네트워크 오류, timeout 등)
  if (error) {
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {COMMON_ERROR_MESSAGES.API_FETCH_ERROR}
      </div>
    )
  }

  // Expected Error: API 응답은 받았지만 데이터가 없거나 실패 응답
  if (!data?.success || !data.data) {
    const errorMessage =
      data?.message || '랭킹 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        {errorMessage}
      </div>
    )
  }

  const memberRankItems = data.data

  if (memberRankItems.length === 0) {
    return (
      <div className="w-full text-sm text-[#999999] text-center whitespace-pre-line">
        랭킹 데이터가 없습니다.
      </div>
    )
  }

  return memberRankItems.map((item) => (
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
}
