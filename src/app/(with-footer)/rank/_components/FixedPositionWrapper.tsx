'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface FixedPositionWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function FixedPositionWrapper({ children, className }: FixedPositionWrapperProps) {
  const [position, setPosition] = useState<{ left: number; width: number } | null>(null)

  useEffect(() => {
    const updatePosition = () => {
      const container = document.getElementById('app-container')
      if (container) {
        const rect = container.getBoundingClientRect()
        setPosition({ left: rect.left, width: rect.width })
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [])

  return (
    <div
      className={cn('fixed', className)}
      style={
        position
          ? {
              left: position.left,
              width: position.width,
            }
          : {
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '500px',
            }
      }
    >
      {children}
    </div>
  )
}
