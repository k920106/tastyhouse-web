import { formatDecimal } from '@/lib/number'
import { PlaceMenu } from '@/types/api/place-detail'
import Image from 'next/image'

interface PlaceMenuListProps {
  menus: PlaceMenu[]
}

export default function PlaceMenuList({ menus }: PlaceMenuListProps) {
  if (menus.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">메뉴가 없습니다.</div>
  }

  console.log(menus)

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id}>
          <h3 className="mb-4 text-[17px]">대표 메뉴</h3>
          <div className="space-y-4">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="flex gap-3 pb-4 border-b border-[#eeeeee] last:border-0"
              >
                <div className="relative w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden">
                  <Image src={menu.imageUrl} alt={menu.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="mb-1 text-[15px]">{menu.name}</h4>
                    <div className="flex items-center gap-2 text-[13px]">
                      <span className="text-[17px]">
                        {(menu.discountPrice ?? menu.originalPrice).toLocaleString()}원
                      </span>
                      {menu.discountRate && (
                        <>
                          <span className="text-[#999999] line-through">
                            {menu.originalPrice.toLocaleString()}원
                          </span>
                          <span className="text-main">{menu.discountRate}%</span>
                        </>
                      )}
                    </div>
                  </div>
                  {menu.rating && menu.reviewCount && (
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-[17px] text-main">{formatDecimal(menu.rating, 1)}</span>
                      <span className="text-[13px] text-[#999999]">리뷰 ({menu.reviewCount})</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
