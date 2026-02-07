import AppButton from '@/components/ui/AppButton'

interface PaymentActionBarProps {
  onPaymentClick: () => void
}

export default function PaymentActionBar({ onPaymentClick }: PaymentActionBarProps) {
  return (
    <div className="px-[15px] py-5">
      <AppButton className="!bg-[#a91201]" onClick={onPaymentClick}>
        결제하기
      </AppButton>
    </div>
  )
}
