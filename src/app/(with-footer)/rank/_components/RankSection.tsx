import { RankPeriod } from '@/types/api/rank'
import RankHeaderSection from './RankHeaderSection'
import RankListSection from './RankListSection'

interface RankSectionProps {
  rankPeriod: RankPeriod
}

export default function RankSection({ rankPeriod }: RankSectionProps) {
  return (
    <section className="px-4 py-5 bg-white">
      <RankHeaderSection rankPeriod={rankPeriod} />
      <RankListSection rankPeriod={rankPeriod} />
    </section>
  )
}
