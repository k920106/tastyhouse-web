'use client'

import AppButton from '@/components/ui/AppButton'
import AppInputAmount from '@/components/ui/AppInputAmount'
import { formatNumber } from '@/lib/number'
import { IoIosCloseCircle } from 'react-icons/io'

interface PointSelectorProps {
  availablePoints: number
  pointInput: string
  onPointInputChange: (value: string) => void
}

export default function PointSelector({
  availablePoints,
  pointInput,
  onPointInputChange,
}: PointSelectorProps) {
  const handleApplyAllPoints = () => {
    onPointInputChange(availablePoints.toString())
  }

  const handleClearPoints = () => {
    onPointInputChange('')
  }

  return (
    <div>
      <h3 className="text-xs leading-[12px] mb-2.5">포인트</h3>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <AppInputAmount
            value={pointInput}
            onChange={(e) => onPointInputChange(e.target.value)}
            placeholder="0"
          />
          {pointInput && (
            <button
              onClick={handleClearPoints}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5"
            >
              <IoIosCloseCircle size={19} color="#aaaaaa" />
            </button>
          )}
        </div>
        <AppButton
          onClick={handleApplyAllPoints}
          className="w-[105px] text-sm leading-[14px] text-white bg-[#a91201]"
        >
          전액사용
        </AppButton>
      </div>
      <p className="flex gap-1 mt-2.5">
        <span className="text-xs leading-[12px] text-[#aaaaaa]">사용 가능한 포인트</span>
        <span className="text-xs leading-[12px]">{formatNumber(availablePoints)}원</span>
      </p>
    </div>
  )
}
