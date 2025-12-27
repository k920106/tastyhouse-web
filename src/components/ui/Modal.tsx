'use client'

import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/shadcn/dialog'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { DialogProps } from '@radix-ui/react-dialog'
import * as React from 'react'

interface ModalProps extends DialogProps {
  contentClassName?: string
}

export function Modal({ children, contentClassName, ...props }: ModalProps) {
  const [position, setPosition] = React.useState({ left: 0, width: 0 })

  React.useEffect(() => {
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
    <Dialog {...props}>
      <DialogPortal>
        <DialogOverlay
          style={{
            left: position.left,
            right: `calc(100vw - ${position.left + position.width}px)`,
          }}
        />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
          className={cn(
            'fixed top-[50%] translate-y-[-50%] w-[calc(100%-2rem)] max-w-[468px] bg-white z-50',
            contentClassName,
          )}
          style={{
            left: position.left + 16,
            right: `calc(100vw - ${position.left + position.width - 16}px)`,
          }}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  )
}

export function ModalHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <DialogHeader className={className} {...props} />
}

export function ModalTitle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <DialogTitle className={className} {...props} />
}

export function ModalDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <DialogDescription className={className} {...props} />
}

export function ModalContentWrapper({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={className} {...props} />
}

export function ModalFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <DialogFooter className={className} {...props} />
}
