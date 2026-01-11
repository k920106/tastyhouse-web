import AppButton from '@/components/ui/AppButton'
import FixedBottomSection from '@/components/ui/FixedBottomSection'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'
import PlaceMenuFetcher from './PlaceMenuServer'

interface PlaceMenuListSectionProps {
  placeId: number
}

export default function PlaceMenuListSection({ placeId }: PlaceMenuListSectionProps) {
  return (
    <section className="px-[15px]">
      <PlaceMenuFetcher placeId={placeId} />
      <FixedBottomSection className="px-[15px] py-[10px] bg-[#f9f9f9]!">
        <Link href={PAGE_PATHS.ORDER_METHOD(placeId)}>
          <AppButton className="bg-main">주문하기</AppButton>
        </Link>
      </FixedBottomSection>
    </section>
  )
}
