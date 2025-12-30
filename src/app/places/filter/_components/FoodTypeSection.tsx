import { Suspense } from 'react'
import FoodTypeContent from './FoodTypeContent'
import { FoodTypeSelectorSkeleton } from './FoodTypeSelector'

export default function FoodTypeSection() {
  return (
    <section className="px-4 py-5 bg-white border-y border-[#eeeeee] box-border">
      <h2 className="mb-[15px] text-sm leading-[14px]">음식 종류</h2>
      <Suspense fallback={<FoodTypeSelectorSkeleton />}>
        <FoodTypeContent />
      </Suspense>
    </section>
  )
}
