'use client'

import ImageContainer from '@/components/ui/ImageContainer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion'
import { formatNumber } from '@/lib/number'
import { formatOrderSummary } from '@/lib/order'

interface OrderItem {
  name: string
  imageUrl: string
  salePrice: number
  quantity: number
}

interface OrderInfoSectionProps {
  placeName: string
  items: OrderItem[]
  firstProductName: string
  totalItemCount: number
}

export default function OrderInfoSection({
  placeName,
  items,
  firstProductName,
  totalItemCount,
}: OrderInfoSectionProps) {
  return (
    <Accordion type="single" collapsible defaultValue="order-info">
      <AccordionItem value="order-info" className="border-b-0">
        <AccordionTrigger className="items-center px-[15px] pt-5 pb-[15px] hover:no-underline">
          <div className="flex-1 flex items-center justify-between gap-2">
            <h2 className="text-base leading-[16px]">{placeName}</h2>
            <span className="text-xs leading-[12px] text-[#aaaaaa]">
              {formatOrderSummary(firstProductName, totalItemCount)}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <div className="px-4">
            <div className="divide-y divide-[#eeeeee] first:border-t border-[#eeeeee]">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-[15px] py-[15px]">
                  <ImageContainer src={item.imageUrl} alt={item.name} size={50} />
                  <div className="flex flex-col gap-2.5">
                    <h3 className="text-sm leading-[14px]">{item.name}</h3>
                    <p className="text-sm leading-[14px]">
                      {formatNumber(item.salePrice)}원 | {item.quantity}개
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
