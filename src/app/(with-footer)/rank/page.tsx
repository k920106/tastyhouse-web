import ErrorFallback from '@/components/ui/error-fallback'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/common'
import {
  MemberRankItem,
  MyRankItem,
  PrizeItem,
  RankEventInfo,
  RankMemberQuery,
  RankPeriod,
  rankPeriodToRankType,
} from '@/types/api/rank'
import Link from 'next/link'
import { Suspense } from 'react'
import RankHeaderInfo from './_components/RankHeaderInfo'
import RankItem from './_components/RankItem'
import TopPrizesList from './_components/TopPrizesList'
import { retryRankPage } from './actions'

function TopPrizesSkeleton() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <TopPrizesSkeletonItem key={i} />
      ))}
    </>
  )
}

function TopPrizesSkeletonItem() {
  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      <div className="relative w-full max-w-[144px] mb-[15px] aspect-square">
        <Skeleton className="w-full h-full flex items-center justify-center border border-[#eeeeee] rounded-full" />
      </div>
      <div className="flex flex-col items-center gap-2 w-full text-center">
        <Skeleton className="w-14 h-3" />
        <Skeleton className="w-20 h-3" />
      </div>
    </div>
  )
}

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

  return <TopPrizesList prizes={data.data} />
}

function RankHeaderSkeleton() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-3 p-0 bg-white">
            <Skeleton className="w-10 h-7" />
            <Skeleton className="w-10 h-7" />
          </div>
          <Skeleton className="w-[15px] h-[15px]" />
        </div>
        <Skeleton className="w-40 h-5" />
      </div>
      <Skeleton className="w-30 h-5 ml-auto" />
    </>
  )
}

async function RankHeader({ rankPeriod }: { rankPeriod: RankPeriod }) {
  // API 호출
  const { error, data } = await api.get<ApiResponse<RankEventInfo>>(
    '/api/event/v1/ranking/duration',
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
      data?.message || '이벤트 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return <ErrorFallback message={errorMessage} showRetry onRetry={retryRankPage} />
  }

  return <RankHeaderInfo eventInfo={data.data} initialTab={rankPeriod} />
}

function RankListSkeleton() {
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

function RankListSkeletonItem() {
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

async function MyRank() {
  // API 호출
  const { error, data } = await api.get<ApiResponse<MyRankItem>>('/api/ranks/v1/members/me')

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
      data?.message || '이벤트 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.'
    return <ErrorFallback message={errorMessage} showRetry onRetry={retryRankPage} />
  }

  const info = data.data

  return (
    <RankItem
      rankNo={info.rankNo}
      profileImageUrl={info.profileImageUrl}
      nickname={info.nickname}
      grade={info.grade}
      reviewCount={info.reviewCount}
      isMe
    />
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
      <section className="px-7 py-[30px] bg-white">
        <div className="flex justify-between items-end gap-2">
          <Suspense fallback={<TopPrizesSkeleton />}>
            <Prizelists />
          </Suspense>
        </div>
      </section>
      <section className="px-4 py-5 bg-white">
        <section>
          <Suspense fallback={<RankHeaderSkeleton />}>
            <RankHeader rankPeriod={rankPeriod} />
          </Suspense>
        </section>
        <section className="flex flex-col gap-2.5 pt-[25px]">
          <Suspense fallback={<RankListSkeleton />}>
            <Ranklists rankPeriod={rankPeriod} />
          </Suspense>
        </section>
      </section>
      <div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 w-full max-w-[500px]">
        <section className="bg-[#eeeeee] border border-[#cccccc]">
          <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#eeeeee] rounded-[2.5px]">
            <Suspense fallback={<RankListSkeletonItem />}>
              <MyRank />
            </Suspense>
          </div>
        </section>
      </div>
    </>
  )
}
