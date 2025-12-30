'use client'

interface FilterApplyButtonProps {
  hasSelection: boolean
  onApply: () => void
}

export default function FilterApplyButton({ hasSelection, onApply }: FilterApplyButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#eeeeee] box-border">
      <button
        onClick={onApply}
        className={`w-full h-[52px] text-white rounded transition-colors ${
          hasSelection ? 'bg-main' : 'bg-[#ffb3ad]'
        }`}
      >
        필터 적용
      </button>
    </div>
  )
}
