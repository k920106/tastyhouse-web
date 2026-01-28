import CircleCheckbox from '../ui/CircleCheckbox'

interface SelectAllCheckboxProps {
  label: string
  selectedCount: number
  totalCount: number
  checked: boolean
  onChange: (value: boolean) => void
}

export default function SelectAllCheckbox({
  label,
  selectedCount,
  totalCount,
  checked,
  onChange,
}: SelectAllCheckboxProps) {
  return (
    <button onClick={() => onChange(!checked)} className="flex items-center gap-2">
      <CircleCheckbox checked={checked} onChange={onChange} />
      <span className="text-sm leading-[14px]">
        {label} ({selectedCount}/{totalCount})
      </span>
    </button>
  )
}
