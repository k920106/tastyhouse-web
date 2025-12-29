import { cn } from '@/lib/utils'
import * as React from 'react'

export interface HashTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tag: string
  variant?: 'primary' | 'secondary'
}

const variantStyles = {
  primary: 'bg-white',
  secondary: 'bg-[#f9f9f9]',
}

export default function HashTag({ tag, variant = 'primary', className, ...props }: HashTagProps) {
  return (
    <span
      className={cn(
        'flex-shrink-0 inline-block px-[11px] py-[8px] text-[10px] leading-[10px] text-[#666666] whitespace-nowrap border border-[#eeeeee] rounded-[12.5px]',
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      #{tag}
    </span>
  )
}
