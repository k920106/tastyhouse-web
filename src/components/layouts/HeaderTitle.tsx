import { cn } from '@/lib/utils'

interface HeaderTitleProps {
  children: React.ReactNode
  className?: string
}

export function HeaderTitle({ children, className }: HeaderTitleProps) {
  return <h1 className={cn('text-[17px] leading-[17px]', className)}>{children}</h1>
}
