import { RankPeriod } from '@/types/api/rank'
import MyRankFixedSection from './_components/MyRankFixedSection'
import PrizeSection from './_components/PrizeSection'
import RankSection from './_components/RankSection'

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
      <PrizeSection />
      <RankSection rankPeriod={rankPeriod} />
      <MyRankFixedSection />
    </>
  )
}
