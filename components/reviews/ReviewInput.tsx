'use client'

interface ReviewInputProps {
  value: string
  onChange: (val: string) => void
}

export default function ReviewInput({ value, onChange }: ReviewInputProps) {
  return (
    <div className="flex flex-col gap-2.5 px-4 py-6 bg-white">
      <label className="text-xs text-gray-700" htmlFor="content">
        내용 <span className="text-red-500">*</span>
      </label>
      <textarea
        className="w-full h-32 px-4 py-[15px] text-sm border border-border-input box-border focus:border-input-focus focus:ring-1 focus:ring-border-input-focus outline-none resize-none"
        id="content"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={500}
      />
      <div className="text-right text-sm text-gray-400 mt-1">{value.length}/500</div>
    </div>
  )
}
