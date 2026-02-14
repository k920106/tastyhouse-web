import ImageContainer from '@/components/ui/ImageContainer'
import type { OrderItemResponse } from '@/domains/order'
import { formatNumber } from '@/lib/number'

interface OrderedProductListProps {
  placeName: string
  orderItems: OrderItemResponse[]
}

export default function OrderedProductList({ placeName, orderItems }: OrderedProductListProps) {
  return (
    <>
      <div className="px-[15px] pt-5 pb-[15px]">
        <h2 className="text-base leading-[16px]">{placeName}</h2>
      </div>
      <div className="px-4 pb-[5px]">
        <div className="divide-y divide-[#eeeeee] first:border-t border-[#eeeeee]">
          {orderItems.map((item) => (
            <div key={item.id} className="flex items-center gap-[15px] py-[15px]">
              <ImageContainer src={item.productImageUrl} alt={item.productName} size={50} />
              <div className="flex flex-col gap-2.5">
                <h3 className="text-sm leading-[14px]">{item.productName}</h3>
                {item.options && item.options.length > 0 && (
                  <div className="space-y-1">
                    {item.options.map((opt, index) => (
                      <p key={index} className="text-xs text-[#999999]">
                        {opt.optionName}
                        {opt.additionalPrice > 0 && ` (${formatNumber(opt.additionalPrice)}원)`}
                      </p>
                    ))}
                  </div>
                )}
                <p className="text-sm leading-[14px]">
                  {formatNumber(item.unitPrice)}원 | {item.quantity}개
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
