'use client'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export default function AppButton({ className, variant, size, asChild, ...props }: AppButtonProps) {
  return (
    <Button
      className={cn('h-[50px] m-0 p-0 text-base rounded-none', className)}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    />
  )
}
