import { cn } from '@/lib/utils'
import Image from 'next/image'

interface ImageContainerProps {
  src: string
  alt: string
  size: 65 | 75
  className?: string
}

export default function ImageContainer({ src, alt, size = 75, className }: ImageContainerProps) {
  const sizeClass = size === 65 ? 'w-[65px] h-[65px]' : 'w-[75px] h-[75px]'
  const sizeValue = `${size}px`

  return (
    <div className={cn('relative flex-shrink-0 overflow-hidden', sizeClass, className)}>
      <Image src={src} alt={alt} fill className="object-cover" sizes={sizeValue} />
    </div>
  )
}
