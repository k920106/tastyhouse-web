import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/common'
import { MemberRankItem, PrizeItem, RankType } from '@/types/api/rank'
import MyRankSection from './_components/MyRankSection'
import RankSection from './_components/RankSection'
import TopPrizesSection from './_components/TopPrizesSection'

async function getTopPrizes(): Promise<PrizeItem[]> {
  const { data, error } = await api.get<ApiResponse<PrizeItem[]>>('/api/prizes/v1')

  if (error) {
    console.error('[상품 조회 실패]', error)
    return []
  }

  if (!data?.success || !data.data) {
    console.warn('[상품 조회 실패] API 응답:', data?.message || '알 수 없는 오류')
    return []
  }

  return data.data
}

async function getRankings(type: RankType): Promise<MemberRankItem[]> {
  const { data, error } = await api.get<ApiResponse<MemberRankItem[]>>('/api/ranks/v1/members', {
    params: {
      type,
      limit: 100,
    },
  })

  if (error) {
    console.error('[랭킹 조회 실패]', error)
    return []
  }

  if (!data?.success || !data.data) {
    console.warn('[랭킹 조회 실패] API 응답:', data?.message || '알 수 없는 오류')
    return []
  }

  return data.data
}

export default async function RankPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>
}) {
  const { type } = await searchParams
  const rankType: RankType = type === 'monthly' ? 'MONTHLY' : 'ALL'

  const topPrizes = await getTopPrizes()
  const rankings = await getRankings(rankType)

  return (
    <>
      <div className="flex flex-col gap-2.5 min-h-screen bg-[#f9f9f9] pb-[140px]">
        <TopPrizesSection prizes={topPrizes} />
        <RankSection rankings={rankings} initialTab={type === 'monthly' ? 'monthly' : 'all'} />
      </div>
      <MyRankSection />
    </>
  )
}
