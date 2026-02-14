import AppInputText from './AppInputText'

interface AppFormFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  maxLength?: number
  error?: string
}

export default function AppFormField({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  error,
}: AppFormFieldProps) {
  return (
    <div>
      <h3 className="text-xs leading-[12px] mb-2.5">{label}</h3>
      <AppInputText
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  )
}
