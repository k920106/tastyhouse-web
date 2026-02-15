import { resolveImageUrl } from '@/lib/image'
import Image from 'next/image'

const DEFAULT_PROFILE_IMAGE = '/images/account/profile/profile-random.png'

interface ProfileImageProps {
  profileImageUrl: string | null | undefined
  size?: number
  alt?: string
}

export default function ProfileImage({
  profileImageUrl,
  size = 125,
  alt = '프로필 이미지',
}: ProfileImageProps) {
  const src = profileImageUrl ? resolveImageUrl(profileImageUrl) : DEFAULT_PROFILE_IMAGE

  return (
    <div className="relative rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <Image src={src} alt={alt} fill className="object-cover" sizes={`${size}px`} unoptimized />
    </div>
  )
}
