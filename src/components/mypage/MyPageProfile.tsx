'use client'

import Image from 'next/image'
import { FiEdit2 } from 'react-icons/fi'

interface MyPageProfileProps {
  userName: string
  userProfileImage: string | null
  memberBadge: string
  description?: string
  reviewCount: number
}

export default function MyPageProfile({
  userName,
  userProfileImage,
  memberBadge,
  description,
  reviewCount,
}: MyPageProfileProps) {
  return (
    <div className="bg-white -mt-[100px] relative z-10 px-4">
      <div className="flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="relative w-[120px] h-[120px] rounded-full bg-white border-4 border-white overflow-hidden mb-4">
          {userProfileImage ? (
            <Image src={userProfileImage} alt={userName} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <div className="w-16 h-16 rounded-full bg-white" />
            </div>
          )}
        </div>

        {/* 닉네임과 수정 아이콘 */}
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-[20px] font-bold">{userName}</h1>
          <button className="p-1">
            <FiEdit2 size={16} className="text-gray-600" />
          </button>
        </div>

        {/* 멤버 뱃지 */}
        <div className="flex items-center gap-1 mb-3">
          <Image src="/images/icon-member-badge.png" alt="멤버 뱃지" width={20} height={20} />
          <span className="text-[14px] text-[#FFA500]">
            {memberBadge} (리뷰 {reviewCount}개)
          </span>
        </div>

        {/* 설명 */}
        {description && <p className="text-[14px] text-gray-600 text-center mb-6">{description}</p>}
      </div>
    </div>
  )
}
