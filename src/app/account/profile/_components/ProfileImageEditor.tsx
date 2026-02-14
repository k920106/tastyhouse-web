import Image from 'next/image'

interface ProfileImageEditorProps {
  profileImageUrl: string | null
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileImageEditor({
  profileImageUrl,
  onImageChange,
}: ProfileImageEditorProps) {
  return (
    <div className="flex justify-center pt-8 pb-7">
      <div className="relative">
        <div className="relative w-[125px] h-[125px] rounded-full overflow-hidden">
          <Image
            src={profileImageUrl ?? '/images/account/profile/profile-random.png'}
            alt="프로필 이미지"
            fill
            className="object-cover"
            sizes="125px"
          />
        </div>
        <label
          htmlFor="profile-image"
          className="absolute bottom-0 right-0 w-[30px] h-[30px] bg-[#eeeeee] rounded-full flex items-center justify-center cursor-pointer"
        >
          <Image
            src="/images/account/profile/icon-camera.png"
            alt="카메라"
            width={15}
            height={12}
          />
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageChange}
          />
        </label>
      </div>
    </div>
  )
}
