'use client'

import Image from 'next/image'

interface MyPagePaymentItemProps {
  storeName: string
  productName: string
  price: number
  date: string
  status: '결제완료' | '사용완료' | '결제취소'
  storeImage: string
}

export default function MyPagePaymentItem({
  storeName,
  productName,
  price,
  date,
  status,
  storeImage,
}: MyPagePaymentItemProps) {
  const statusColor =
    status === '결제완료'
      ? 'text-green-600'
      : status === '사용완료'
        ? 'text-gray-500'
        : 'text-red-600'

  return (
    <div className="bg-white border-b border-gray-100 px-4 py-4">
      <div className="flex gap-4">
        {/* 매장 이미지 */}
        <div className="relative w-[80px] h-[80px] rounded-lg overflow-hidden flex-shrink-0">
          <Image src={storeImage} alt={storeName} fill className="object-cover" />
        </div>

        {/* 주문 정보 */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <p className="text-[13px] text-gray-500 mb-1">{storeName}</p>
            <p className="text-[15px] font-bold mb-2">{productName}</p>
            <p className="text-[16px] font-bold">{price.toLocaleString()}원</p>
          </div>
        </div>

        {/* 날짜와 상태 */}
        <div className="flex flex-col items-end justify-between">
          <p className="text-[13px] text-gray-500">{date}</p>
          <p className={`text-[13px] font-medium ${statusColor}`}>{status}</p>
        </div>
      </div>
    </div>
  )
}
