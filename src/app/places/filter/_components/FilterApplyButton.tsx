'use client'

import AppButton from '@/components/ui/AppButton'
import FixedBottomSection from '@/components/ui/FixedBottomSection'

interface FilterApplyButtonProps {
  hasSelection: boolean
  onApply: () => void
}

export default function FilterApplyButton({ hasSelection, onApply }: FilterApplyButtonProps) {
  return (
    <FixedBottomSection className="px-[15px] py-2.5">
      <AppButton className="bg-main" onClick={onApply} disabled={!hasSelection}>
        필터 적용
      </AppButton>
    </FixedBottomSection>
  )
}
