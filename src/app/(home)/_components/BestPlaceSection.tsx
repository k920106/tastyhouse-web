import { BestPlace } from '@/types/api/place'
import Image from 'next/image'
import Link from 'next/link'

interface BestPlaceSectionProps {
  places: BestPlace[]
}

export default function BestPlaceSection({ places }: BestPlaceSectionProps) {
  if (places.length === 0) {
    return null
  }
  return (
    <section className="w-full pt-[40px] pb-[30px] bg-[#f9f9f9]">
      <header className="mb-[30px] text-center">
        <h2 className="mb-[15px] text-[23px] text-gray-900 font-[family-name:var(--font-nanum-myeongjo-bold)] font-bold">
          베스트 플레이스
        </h2>
        <p className="text-sm text-[#aaaaaa]">솔직한 평점으로 인증된 플레이스들을 만나보세요.</p>
      </header>
      <div className="px-[15px]">
        <ul className="grid grid-cols-2 gap-3 mb-[25px]">
          {places.map((place) => (
            <li key={place.id}>
              <Link href={`/places/${place.id}`} className="group block overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={place.imageUrl}
                    alt={place.placeName}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="py-[15px]">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs text-[#999999]">{place.stationName}</span>
                    <span className="text-[19px] text-main">{place.rating.toFixed(1)}</span>
                  </div>
                  <h3 className="mb-[15px] truncate">{place.placeName}</h3>
                  <div className="flex gap-1.5 overflow-hidden">
                    {place.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block px-2.5 py-1 text-xs text-[#666666] bg-white border border-[#eeeeee] rounded-[14px] whitespace-nowrap flex-shrink-0"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-center">
          <Link
            href="/places/best"
            className="inline-block w-3/5 py-3 text-sm text-center bg-white border border-[#eeeeee] hover:bg-gray-50 transition-colors"
          >
            더보러가기
          </Link>
        </div>
      </div>
    </section>
  )
}
