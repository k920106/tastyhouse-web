import PlaceMenuFetcher from './PlaceMenuServer'

interface PlaceMenuSectionProps {
  placeId: number
}

export default function PlaceMenuSection({ placeId }: PlaceMenuSectionProps) {
  return (
    <section className="px-[15px] py-[30px] ">
      <PlaceMenuFetcher placeId={placeId} />
      <button className="w-full py-4 mt-6 text-[15px] text-white bg-main rounded-lg">
        주문하기
      </button>
    </section>
  )
}
