import { MemberGrade } from '@/types/api/rank'
import Image from 'next/image'

// 멤버 등급에 따른 아이콘 번호 반환
const getMemberGradeIcon = (grade: MemberGrade): string => {
  const iconMap: Record<MemberGrade, string> = {
    NEWCOMER: '01',
    ACTIVE: '02',
    INSIDER: '03',
    GOURMET: '04',
    TEHA: '05',
  }
  return iconMap[grade]
}

// 멤버 등급에 따른 색상 반환
const getMemberGradeColor = (grade: MemberGrade): string => {
  const colorMap: Record<MemberGrade, string> = {
    NEWCOMER: 'text-[#4a6db3]',
    ACTIVE: 'text-[#ed771f]',
    INSIDER: 'text-[#a5a5a5]',
    GOURMET: 'text-[#f4aa14]',
    TEHA: 'text-main',
  }
  return colorMap[grade]
}

export default function MyRankSection() {
  return (
    <div className="fixed bottom-[70px] left-1/2 -translate-x-1/2 w-full max-w-[500px]">
      <section className="bg-[#eeeeee] border border-[#cccccc]">
        <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#eeeeee] rounded-[2.5px]">
          <div className="flex items-center gap-2.5">
            <div className="flex-shrink-0 w-[22px] flex flex-col items-center">
              <p className="text-xs">127</p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/images/sample/profile/minji.png"
                alt="프로필"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <div className="flex items-center gap-1">
                <p className="w-fit px-[7.5px] py-[1px] bg-main text-white text-[9px] font-bold rounded-lg">
                  나
                </p>
                <p className="text-sm font-bold truncate">닉네임을뭐라고하지</p>
              </div>
              <p className="flex items-center gap-[5px]">
                <Image
                  src={`/images/rank/icon-level-${getMemberGradeIcon('TEHA')}-40.png`}
                  alt="계급"
                  width={14}
                  height={14}
                />
                <span className={`text-xs ${getMemberGradeColor('TEHA')}`}>테하멤버</span>
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-xs text-[#666666]">22개</div>
          </div>
        </div>
      </section>
    </div>
  )
}
