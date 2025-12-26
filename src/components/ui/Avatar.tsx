import Image from 'next/image'

const DEFAULT_PROFILE_IMAGE = '/images/sample/profile/default.png'

interface AvatarProps {
  src?: string | null
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeMap = {
  sm: 24,
  md: 40,
  lg: 56,
  xl: 80,
} as const

export default function Avatar({ src, alt, size = 'md', className = '' }: AvatarProps) {
  const dimension = sizeMap[size]

  return (
    <Image
      src={src || DEFAULT_PROFILE_IMAGE}
      alt={alt}
      width={dimension}
      height={dimension}
      className={`rounded-full ${className}`}
    />
  )
}
