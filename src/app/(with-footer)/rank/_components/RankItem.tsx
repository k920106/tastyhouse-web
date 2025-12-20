import Image from 'next/image'
import {
  getMemberGradeColor,
  getMemberGradeDisplayName,
  getMemberGradeIcon,
} from '@/lib/rank'
import { MemberGrade } from '@/types/api/rank'

interface RankItemProps {
  rankNo: number
  profileImageUrl: string
  nickname: string
  grade: MemberGrade
  reviewCount: number
  isMe?: boolean
}

export default function RankItem({
  rankNo,
  profileImageUrl,
  nickname,
  grade,
  reviewCount,
  isMe = false,
}: RankItemProps) {
  const gradeDisplayName = getMemberGradeDisplayName(grade)
  const gradeIcon = getMemberGradeIcon(grade)
  const gradeColor = getMemberGradeColor(grade)

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2.5">
        <div className="flex flex-col items-center flex-shrink-0 w-[22px]">
          {rankNo <= 3 ? (
            <Image
              src={`/images/rank/icon-rank-0${rankNo}.png`}
              alt={`${rankNo}등`}
              width={22}
              height={30}
            />
          ) : (
            <p className="text-xs">{rankNo}</p>
          )}
        </div>
        <div className="flex-shrink-0">
          <Image
            src={profileImageUrl || '/images/sample/profile/default.png'}
            alt={nickname}
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-1">
            {isMe && (
              <p className="w-fit px-[7.5px] py-[1px] bg-main text-white text-[9px] font-bold rounded-lg">
                나
              </p>
            )}
            <p className="text-sm font-bold truncate">{nickname}</p>
          </div>
          <p className="flex items-center gap-[5px]">
            <Image
              src={`/images/rank/icon-level-${gradeIcon}-40.png`}
              alt={gradeDisplayName}
              width={14}
              height={14}
            />
            <span className={`text-xs ${gradeColor}`}>{gradeDisplayName}</span>
          </p>
        </div>
      </div>
      <div className="text-xs text-[#666666]">{reviewCount}개</div>
    </div>
  )
}
