import { ReactNode } from 'react'

interface BorderedSectionProps {
  children: ReactNode
  className?: string
}

export default function BorderedSection({ children, className = '' }: BorderedSectionProps) {
  return (
    <section className={`bg-white border-y border-[#eeeeee] box-border ${className}`}>
      {children}
    </section>
  )
}
