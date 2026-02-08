'use client'

import { getMemberGradeColor, getMemberGradeIcon, getMemberGradeName } from '@/constants/member'
import { MemberGradeCode } from '@/domains/member'
import Image from 'next/image'

interface MyPageProfileProps {
  userName: string
  userProfileImage: string | null
  grade: MemberGradeCode
  description?: string
  reviewCount: number
  followingCount: number
  followerCount: number
}

export default function MyPageProfile({
  userName,
  userProfileImage,
  grade,
  description,
  reviewCount,
  followingCount,
  followerCount,
}: MyPageProfileProps) {
  const gradeName = getMemberGradeName(grade)
  const gradeIcon = getMemberGradeIcon(grade)
  const gradeColor = getMemberGradeColor(grade)

  return (
    <div className="flex-1 flex flex-col items-center bg-white">
      <div className="-mt-[63px] relative z-10 w-[125px] h-[125px] rounded-full overflow-hidden">
        {userProfileImage ? (
          <Image
            src={userProfileImage}
            alt={userName}
            fill
            className="object-cover"
            sizes="125px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="w-16 h-16 rounded-full bg-white" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-0.5 mt-[21px]">
        <h1 className="text-base leading-[16px] font-bold">{userName}</h1>
        <Image src="/images/mypage/icon-pen.png" alt="pencil" width={18} height={16} />
      </div>
      <div className="flex items-center gap-1.5 mt-2">
        <div className="relative w-[14px] h-[14px]">
          <Image
            src={`/images/rank/icon-level-${gradeIcon}-40.png`}
            alt={gradeName}
            fill
            style={{ objectFit: 'contain' }}
            sizes="16px"
          />
        </div>
        <span className={`text-sm leading-[14px] font-bold ${gradeColor}`}>{gradeName}</span>
      </div>
      {description && (
        <p className="text-[13px] text-gray-500 text-center mt-3 px-8">{description}</p>
      )}
      <div className="flex items-center justify-center gap-10 mt-[53px]">
        <button className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">리뷰</span>
          <span className="text-xs leading-[12px] font-bold">{reviewCount}</span>
        </button>
        <button className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">팔로잉</span>
          <span className="text-xs leading-[12px] font-bold">{followingCount}</span>
        </button>
        <button className="flex items-center gap-1">
          <span className="text-xs leading-[12px]">팔로워</span>
          <span className="text-xs leading-[12px] font-bold">{followerCount}</span>
        </button>
      </div>
    </div>
  )
}
