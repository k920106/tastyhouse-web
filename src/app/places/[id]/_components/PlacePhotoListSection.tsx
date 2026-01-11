import PlacePhotoListFetcher from './PlacePhotoListFetcher'

interface PlacePhotoListSectionProps {
  placeId: number
}

export default function PlacePhotoListSection({ placeId }: PlacePhotoListSectionProps) {
  return (
    <section className="px-[15px]">
      <PlacePhotoListFetcher placeId={placeId} />
    </section>
  )
}
