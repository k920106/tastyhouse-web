interface NicknameProps {
  children: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  truncate?: boolean
}

const sizeMap = {
  sm: 'text-xs leading-[12px]',
  md: 'text-sm leading-[14px]',
  lg: 'text-base leading-[16px]',
} as const

export default function Nickname({
  children,
  size = 'md',
  className = '',
  truncate = true,
}: NicknameProps) {
  return (
    <p
      className={`font-bold ${sizeMap[size]} ${truncate ? 'truncate' : ''} ${className}`}
    >
      {children}
    </p>
  )
}
