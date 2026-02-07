'use client'

import AppAlertDialog from '@/components/ui/AppAlertDialog'
import AppButton from '@/components/ui/AppButton'
import AppConfirmDialog from '@/components/ui/AppConfirmDialog'
import { Button } from '@/components/ui/shadcn/button'
import { Spinner } from '@/components/ui/shadcn/spinner'
import type { PaymentCancelCode, PaymentStatus } from '@/domains/payment'
import { formatPhoneNumber } from '@/lib/utils'
import { cancelPayment } from '@/services/payment'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiSupport } from 'react-icons/bi'
import { IoIosCall } from 'react-icons/io'

interface CancelResultModalConfig {
  title: string
  description: string
  showContactStore: boolean
  showContactSupport: boolean
}

const CANCEL_RESULT_CONFIG: Record<PaymentCancelCode, CancelResultModalConfig> = {
  SUCCESS: {
    title: '알림',
    description:
      '주문이 정상적으로 취소되었습니다.\n카드 승인이 취소 후 환불되며, 카드사의 사정에 따라 승인 취소 후 환불이 지연될 수 있습니다.',
    showContactStore: false,
    showContactSupport: false,
  },
  ALREADY_PREPARING: {
    title: '알림',
    description:
      '이미 조리가 시작되어 바로 취소가 어렵습니다.\n아래 방법으로 도와드릴 수 있습니다.',
    showContactStore: true,
    showContactSupport: true,
  },
  ALREADY_CANCELLED: {
    title: '알림',
    description:
      '이 주문은 이미 취소되었습니다.\n결제 금액은 카드사 환불 진행 중이거나 이미 환불 완료된 상태입니다.',
    showContactStore: false,
    showContactSupport: false,
  },
  ORDER_COMPLETED: {
    title: '알림',
    description: '이 주문은 이미 완료되었습니다.\n고객센터에 문의해 주세요.',
    showContactStore: false,
    showContactSupport: true,
  },
}

interface CancelOrderButtonProps {
  paymentId: number
  paymentStatus: PaymentStatus
  phoneNumber: string
}

export default function CancelOrderButton({
  paymentId,
  paymentStatus,
  phoneNumber,
}: CancelOrderButtonProps) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [cancelResultCode, setCancelResultCode] = useState<PaymentCancelCode | null>(null)
  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const resultConfig = cancelResultCode ? CANCEL_RESULT_CONFIG[cancelResultCode] : null

  const handleCancelClick = () => {
    if (paymentStatus === 'CANCELLED') {
      setCancelResultCode('ALREADY_CANCELLED')
      return
    }

    setShowCancelConfirm(true)
  }

  const handleCancelPayment = async () => {
    setShowCancelConfirm(false)
    setIsLoading(true)
    const response = await cancelPayment(paymentId, {})
    setIsLoading(false)

    if (response.error) {
      alert('결제 취소 중 오류가 발생했습니다.')
      return
    }

    const code = response.data?.data?.code
    if (code) {
      setCancelResultCode(code)
      if (code === 'SUCCESS') {
        router.refresh()
      }
    }
  }

  const handleCloseModal = () => {
    setCancelResultCode(null)
  }

  const handleContactStore = () => {
    setCancelResultCode(null)
    window.location.href = `tel:${phoneNumber}`
  }

  const handleContactSupport = () => {
    setCancelResultCode(null)

    router.push('/customer-center')
  }

  return (
    <>
      <div className="px-[15px] py-5">
        <AppButton className="!bg-[#a91201]" onClick={handleCancelClick} disabled={isLoading}>
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
      <AppConfirmDialog
        open={showCancelConfirm}
        title="주문을 취소하시겠습니까?"
        description={`주문을 취소하시면 결제 금액은 전액 환불됩니다.\n취소 이후에는 다시 되돌릴 수 없습니다.`}
        onConfirm={handleCancelPayment}
        onCancel={() => setShowCancelConfirm(false)}
        cancelLabel="취소"
        confirmLabel="확인"
      />
      {resultConfig && (
        <>
          <AppAlertDialog
            open={cancelResultCode !== null}
            onOpenChange={(open) => !open && setCancelResultCode(null)}
            title={resultConfig.title as string}
            description={resultConfig.description}
            onConfirm={handleCloseModal}
            confirmLabel="확인"
          />
          {(resultConfig.showContactStore || resultConfig.showContactSupport) && (
            <AppAlertDialog
              open={cancelResultCode !== null}
              onOpenChange={(open) => !open && setCancelResultCode(null)}
              title={resultConfig.title as string}
              description={resultConfig.description}
              descriptionComponent={
                <>
                  <div className="flex flex-col gap-2">
                    {resultConfig.showContactStore && (
                      <Button variant="outline" size="sm" onClick={handleContactStore}>
                        <IoIosCall />
                        가게로 전화하기 ({formatPhoneNumber(phoneNumber)})
                      </Button>
                    )}
                    {resultConfig.showContactSupport && (
                      <Button variant="outline" size="sm" onClick={handleContactSupport}>
                        <BiSupport />
                        고객센터로 문의하기
                      </Button>
                    )}
                  </div>
                </>
              }
              onConfirm={handleCloseModal}
              confirmLabel="확인"
            />
          )}
        </>
      )}
    </>
  )
}
