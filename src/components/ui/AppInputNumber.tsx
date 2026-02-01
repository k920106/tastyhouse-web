import AppInput from './AppInput'

type AppInputNumberProps = Omit<
  React.ComponentProps<typeof AppInput>,
  'type' | 'onKeyDown' | 'onPaste'
>

const ALLOWED_KEYS = new Set([
  'Backspace',
  'Delete',
  'Tab',
  'Escape',
  'Enter',
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
])

export default function AppInputNumber(props: AppInputNumberProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (ALLOWED_KEYS.has(e.key)) return
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key))
      return
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData('text')
    if (!/^\d+$/.test(pastedText)) {
      e.preventDefault()
    }
  }

  return (
    <AppInput
      type="text"
      inputMode="numeric"
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      {...props}
    />
  )
}
