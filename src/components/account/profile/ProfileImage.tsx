import Image from 'next/image'

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
  return (
    <div className="relative rounded-full overflow-hidden" style={{ width: size, height: size }}>
      <Image
        src={profileImageUrl ?? '/images/account/profile/profile-random.png'}
        alt={alt}
        fill
        className="object-cover"
        sizes={`${size}px`}
      />
    </div>
  )
}
