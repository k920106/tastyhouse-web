'use client'

import AppButton from '@/components/ui/AppButton'
import { Spinner } from '@/components/ui/shadcn/spinner'
import { cancelPayment } from '@/services/payment'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface CancelOrderButtonProps {
  paymentId: number
}

export default function CancelOrderButton({ paymentId }: CancelOrderButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleCancelPayment = async () => {
    if (!confirm('결제를 취소하시겠습니까?')) {
      return
    }

    setIsLoading(true)

    const response = await cancelPayment(paymentId, {})

    setIsLoading(false)

    if (response.error) {
      alert('결제 취소 중 오류가 발생했습니다.')
      return
    }

    router.refresh()
  }

  return (
    <div className="px-[15px] py-5">
      <AppButton className="!bg-[#a91201]" onClick={handleCancelPayment} disabled={isLoading}>
        {isLoading ? (
          <>
            취소 중
            <Spinner />
          </>
        ) : (
          '결제취소'
        )}
      </AppButton>
    </div>
  )
}
