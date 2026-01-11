import PlaceInfoDetailFetcher from './PlaceInfoDetailFetcher'

interface PlaceInfoSectionProps {
  placeId: number
}

export default function PlaceInfoSection({ placeId }: PlaceInfoSectionProps) {
  return (
    <section className="px-[15px] py-5 bg-white">
      <PlaceInfoDetailFetcher placeId={placeId} />
    </section>
  )
}
