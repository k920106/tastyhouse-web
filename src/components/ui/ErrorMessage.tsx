interface ErrorMessageProps {
  message: string
  className?: string
}

export default function ErrorMessage({ message, className = '' }: ErrorMessageProps) {
  return (
    <div
      className={`w-full text-sm leading-relaxed text-[#999999] text-center whitespace-pre-line ${className}`}
    >
      {message}
    </div>
  )
}
