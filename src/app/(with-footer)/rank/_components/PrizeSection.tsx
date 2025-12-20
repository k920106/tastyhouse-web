import { Suspense } from 'react'
import PrizeList, { PrizeListSkeleton } from './PrizeList'

export default function PrizeSection() {
  return (
    <section className="px-7 py-[30px] bg-white">
      <Suspense fallback={<PrizeListSkeleton />}>
        <PrizeList />
      </Suspense>
    </section>
  )
}
