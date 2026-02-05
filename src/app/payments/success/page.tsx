'use client'

import { toast } from '@/components/ui/AppToaster'
import { PAGE_PATHS } from '@/lib/paths'
import { confirmPayment } from '@/services/payment'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isProcessed = useRef(false)

  useEffect(() => {
    if (isProcessed.current) return
    isProcessed.current = true

    const paymentKey = searchParams.get('paymentKey')
    const orderId = searchParams.get('orderId')
    const amount = searchParams.get('amount')

    if (!paymentKey || !orderId || !amount) {
      toast('결제 정보가 올바르지 않습니다.')
      router.replace(PAGE_PATHS.HOME)
      return
    }

    async function handleConfirm() {
      const result = await confirmPayment({
        paymentKey: paymentKey!,
        orderId: orderId!,
        amount: Number(amount),
      })

      if (result.error) {
        toast(result.error)
        router.replace(PAGE_PATHS.HOME)
        return
      }

      const systemOrderId = orderId!.replace('ORDER_', '')
      router.replace(PAGE_PATHS.ORDER_COMPLETE(systemOrderId))
    }

    handleConfirm()
  }, [searchParams, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-base text-[#666666]">결제 처리 중입니다...</p>
    </div>
  )
}
