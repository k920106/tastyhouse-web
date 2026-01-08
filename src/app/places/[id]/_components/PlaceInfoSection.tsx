import PlaceInfoDetailFetcher from './PlaceInfoDetailFetcher'
import PlaceOwnerMessageFetcher from './PlaceOwnerMessageFetcher'

interface PlaceInfoSectionProps {
  placeId: number
}

export default function PlaceInfoSection({ placeId }: PlaceInfoSectionProps) {
  return (
    <section className="px-[15px] py-5 bg-white">
      <PlaceOwnerMessageFetcher placeId={placeId} />
      <PlaceInfoDetailFetcher placeId={placeId} />
    </section>
  )
}
