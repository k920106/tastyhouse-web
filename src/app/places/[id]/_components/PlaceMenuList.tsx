import { formatDecimal, formatNumber } from '@/lib/number'
import { PlaceMenuCategory } from '@/types/api/place-detail'
import Image from 'next/image'

interface PlaceMenuListProps {
  menus: PlaceMenuCategory[]
}

export default function PlaceMenuList({ menus }: PlaceMenuListProps) {
  if (menus.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">메뉴가 없습니다.</div>
  }

  return (
    <>
      {menus.map((menuCategory, i) => (
        <div key={i} className="pt-[30px] border-b border-[#eeeeee] box-border">
          <h3 className="mb-[5px] text-base leading-[16px] font-bold">
            {menuCategory.categoryName}
          </h3>
          <div className="divide-y divide-[#eeeeee]">
            {menuCategory.menus.map((menu) => (
              <div key={menu.id} className="flex items-center gap-[15px] py-[15px] pr-3">
                <div className="relative w-[65px] h-[65px] flex-shrink-0 overflow-hidden">
                  <Image
                    src={menu.imageUrl}
                    alt={menu.name}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="flex-1 flex flex-col min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {menu.spiciness && (
                        <div className="flex gap-[3px] mb-[7px]">
                          {Array.from({ length: menu.spiciness }).map((_, index) => (
                            <Image
                              src="/images/product/icon-spiciness.png"
                              alt="맵기"
                              width={9}
                              height={15}
                              key={index}
                            />
                          ))}
                        </div>
                      )}
                      <h4 className="mb-[9px] text-sm leading-[14px] truncate">{menu.name}</h4>
                      {menu.discountRate == null ? (
                        <p className="text-sm leading-[14px]">
                          {formatNumber(menu.originalPrice)}원
                        </p>
                      ) : (
                        <div className="flex items-end leading-[21px]">
                          <p className="text-sm leading-[14px]">
                            {formatNumber(menu.discountPrice)}원
                          </p>
                          <p className="ml-[7px] text-xs leading-[12px] text-[#aaaaaa] line-through">
                            {formatNumber(menu.originalPrice)}원
                          </p>
                          <p className="ml-[11px] text-sm leading-[14px] text-main">
                            {formatDecimal(menu.discountRate, 0)}%
                          </p>
                        </div>
                      )}
                    </div>
                    {menu.rating && menu.reviewCount && (
                      <div className="flex flex-col items-center gap-2.5">
                        <p className="text-[19px] leading-[19px] text-main">
                          {formatDecimal(menu.rating, 1)}
                        </p>
                        <p className="text-xs leading-[12px] text-[#999999] tracking-tighter">
                          리뷰 ({menu.reviewCount})
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
