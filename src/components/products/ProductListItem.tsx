import { formatDecimal } from '@/lib/number'
import Image from 'next/image'
import Link from 'next/link'

interface ProductListItemProps {
  id: number
  placeName: string
  name: string
  imageUrl: string
  originalPrice: number
  discountPrice?: number
  discountRate?: number
}

export default function ProductListItem({
  id,
  placeName,
  name,
  imageUrl,
  originalPrice,
  discountPrice,
  discountRate,
}: ProductListItemProps) {
  return (
    <Link href={`/products/${id}`} className="flex items-center gap-4 py-[15px]">
      <div className="relative w-[75px] h-[75px] flex-shrink-0 overflow-hidden">
        <Image src={imageUrl} alt={name} fill className="object-cover" sizes="160px" />
      </div>
      <div className="flex-1 min-w-0 h-[75px] flex flex-col">
        <p className="text-xs mb-1.5">{placeName}</p>
        <h3 className="text-base font-medium mb-auto truncate">{name}</h3>
        <div className="flex justify-between mt-auto">
          {discountRate == null ? (
            <div className="flex items-end gap-2">
              <span className="text-base">{originalPrice.toLocaleString()}원</span>
            </div>
          ) : (
            <>
              <div className="flex items-end gap-2">
                <span className="text-base">{discountPrice?.toLocaleString()}원</span>
                <span className="pb-0.5 text-xs text-[#aaaaaa] line-through">
                  {originalPrice.toLocaleString()}원
                </span>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-base text-main">{formatDecimal(discountRate, 0)}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
