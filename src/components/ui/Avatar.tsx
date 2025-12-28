import Image from 'next/image'

const DEFAULT_PROFILE_IMAGE = '/images/sample/profile/default.png'

interface AvatarProps {
  src?: string | null
  alt: string
  size?: 'sm' | 'md'
  className?: string
  priority?: boolean
}

const sizeMap = {
  sm: { dimension: 30, className: 'size-[30px]' },
  md: { dimension: 40, className: 'size-10' },
} as const

export default function Avatar({ src, alt, size = 'md', className = '', priority = false }: AvatarProps) {
  const { dimension, className: sizeClassName } = sizeMap[size]

  return (
    <Image
      src={src || DEFAULT_PROFILE_IMAGE}
      alt={alt}
      width={dimension}
      height={dimension}
      className={`flex-shrink-0 rounded-full ${sizeClassName} ${className}`}
      priority={priority}
    />
  )
}
