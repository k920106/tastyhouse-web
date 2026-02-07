'use client'

import AppButton from '@/components/ui/AppButton'
import { cancelOrder } from '@/services/order'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CancelOrderButtonProps {
  orderId: number
}

export default function CancelOrderButton({ orderId }: CancelOrderButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelOrder = async () => {
    if (!confirm('주문을 취소하시겠습니까?')) {
      return
    }

    try {
      setIsLoading(true)

      const response = await cancelOrder(orderId)

      if (response.error) {
        alert(response.error)
        return
      }

      alert('주문이 취소되었습니다.')
      router.refresh()
    } catch (error) {
      alert('주문 취소 중 오류가 발생했습니다.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="px-[15px] py-5">
      <AppButton className="!bg-[#a91201]" onClick={handleCancelOrder} disabled={isLoading}>
        {isLoading ? '처리중...' : '결제취소'}
      </AppButton>
    </div>
  )
}
