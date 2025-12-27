import { cn } from '@/lib/utils'

interface FixedPositionWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function FixedPositionWrapper({ children, className }: FixedPositionWrapperProps) {
  return (
    <div className={cn('fixed left-0 right-0 w-full', className)}>
      {children}
    </div>
  )
}
