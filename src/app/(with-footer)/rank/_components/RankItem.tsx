import { getMemberGradeColor, getMemberGradeDisplayName, getMemberGradeIcon } from '@/lib/rank'
import { MemberGrade } from '@/types/api/rank'
import Image from 'next/image'

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
        <div className="relative flex flex-col items-center flex-shrink-0 w-[22px] h-[30px]">
          {rankNo <= 3 ? (
            <Image
              src={`/images/rank/icon-rank-0${rankNo}.png`}
              alt={`${rankNo}등`}
              fill
              style={{ objectFit: 'contain' }}
              sizes="22px"
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
        <div className="flex flex-col gap-2 min-w-0">
          <div className="flex items-center gap-1">
            {isMe && (
              <p className="w-fit px-[7.5px] py-[3px] bg-main text-[9px] leading-[9px] font-bold text-white rounded-lg">
                나
              </p>
            )}
            <p className="text-sm leading-[14px] font-bold truncate">{nickname}</p>
          </div>
          <div className="flex items-center gap-[5px]">
            <div className="relative w-[14px] h-[14px]">
              <Image
                src={`/images/rank/icon-level-${gradeIcon}-40.png`}
                alt={gradeDisplayName}
                fill
                style={{ objectFit: 'contain' }}
                sizes="14px"
              />
            </div>
            <span className={`text-xs leading-[12px] ${gradeColor}`}>{gradeDisplayName}</span>
          </div>
        </div>
      </div>
      <div className="text-xs leading-[12px] text-[#666666]">{reviewCount}개</div>
    </div>
  )
}
