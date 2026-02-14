'use client'

import AppButton from '@/components/ui/AppButton'
import AppFormField from '@/components/ui/AppFormField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import ProfileImageEditor from './ProfileImageEditor'

const profileSchema = z.object({
  nickname: z
    .string()
    .min(1, '닉네임을 입력해주세요.')
    .max(20, '닉네임은 최대 20자까지 가능합니다.'),
  statusMessage: z.string().max(30, '상태메세지는 최대 30자까지 가능합니다.'),
})

type ProfileErrors = {
  nickname?: string
  statusMessage?: string
}

export default function ProfileEditForm() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [statusMessage, setStatusMessage] = useState('')
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null)
  const [errors, setErrors] = useState<ProfileErrors>({})

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const result = profileSchema.safeParse({ nickname, statusMessage })
    if (!result.success) {
      const fieldErrors: ProfileErrors = {}
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ProfileErrors
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return false
    }
    setErrors({})
    return true
  }

  const handleSubmit = async () => {
    if (!validate()) return
    // TODO: 프로필 수정 API 호출
    router.back()
  }

  return (
    <div>
      <ProfileImageEditor profileImageUrl={profileImageUrl} onImageChange={handleImageChange} />
      <div className="flex flex-col gap-5 px-[15px]">
        <AppFormField
          label="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          maxLength={20}
          error={errors.nickname}
        />
        <AppFormField
          label="상태메세지"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
          placeholder="상태메세지는 공백을 포함한 최대 30자까지 가능합니다."
          maxLength={30}
          error={errors.statusMessage}
        />
      </div>
      <div className="px-[15px] mt-[30px]">
        <AppButton onClick={handleSubmit} className="text-white bg-[#a91201]">
          완료
        </AppButton>
      </div>
    </div>
  )
}
