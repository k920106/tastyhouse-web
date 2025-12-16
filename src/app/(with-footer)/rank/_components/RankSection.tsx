'use client'

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MemberGrade, MemberRankItem } from '@/types/api/rank'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdInfo } from 'react-icons/md'

// 멤버 등급을 한글 이름으로 변환
const getMemberGradeDisplayName = (grade: MemberGrade): string => {
  const gradeMap: Record<MemberGrade, string> = {
    NEWCOMER: '신입멤버',
    ACTIVE: '열심멤버',
    INSIDER: '인싸멤버',
    GOURMET: '미식멤버',
    TEHA: '테하멤버',
  }
  return gradeMap[grade]
}

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

interface RankSectionProps {
  rankings: MemberRankItem[]
  initialTab: 'all' | 'monthly'
}

export default function RankSection({ rankings, initialTab }: RankSectionProps) {
  const router = useRouter()

  const handleTabChange = (value: string) => {
    const newType = value === 'monthly' ? 'monthly' : 'all'
    router.push(`/rank?type=${newType}`)
  }

  return (
    <section className="bg-white px-4 py-5">
      <section className="mb-[25px]">
        <Tabs value={initialTab} onValueChange={handleTabChange}>
          <div className="flex justify-between">
            <TabsList className="flex gap-3 p-0 bg-white">
              <TabsTrigger
                className="items-start p-0 font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none"
                value="all"
              >
                <p className="text-lg">전체</p>
              </TabsTrigger>
              <TabsTrigger
                className="items-start p-0 font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none"
                value="monthly"
              >
                <div className="flex items-center gap-1">
                  <p className="text-lg">이번 달</p>
                  <MdInfo size="20" color="#dddddd" />
                </div>
              </TabsTrigger>
            </TabsList>
            <div className="flex flex-col gap-0.5 items-end">
              <div className="text-sm">남은기간 : 8일 1시간 25분</div>
              <div className="text-sm text-[#aaaaaa]">(2020.07.01 - 12.31)</div>
            </div>
          </div>
        </Tabs>
      </section>
      <section className="flex flex-col gap-2.5">
        {rankings.length === 0 ? (
          <div className="text-center py-10 text-[#999999]">랭킹 데이터가 없습니다.</div>
        ) : (
          rankings.map((item) => {
            const gradeDisplayName = getMemberGradeDisplayName(item.grade)
            const gradeIcon = getMemberGradeIcon(item.grade)
            const gradeColor = getMemberGradeColor(item.grade)

            return (
              <Link key={item.memberId} href={`/members/${item.memberId}`}>
                <div className="flex justify-between items-center py-[15px] pl-4 pr-5 bg-[#fcfcfc] border border-[#eeeeee] rounded-[2.5px]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex-shrink-0 w-[22px] flex flex-col items-center">
                      {item.rankNo <= 3 ? (
                        <Image
                          src={`/images/rank/icon-rank-0${item.rankNo}.png`}
                          alt={`${item.rankNo}등`}
                          width={22}
                          height={30}
                        />
                      ) : (
                        <p className="text-xs">{item.rankNo}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <Image
                        src={item.profileImageUrl || '/images/sample/profile/default.png'}
                        alt={item.nickname}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <p className="text-sm font-bold truncate">{item.nickname}</p>
                      <p className="flex items-center gap-[5px]">
                        <Image
                          src={`/images/rank/icon-level-${gradeIcon}-40.png`}
                          alt=""
                          width={14}
                          height={14}
                        />
                        <span className={`text-xs ${gradeColor}`}>{gradeDisplayName}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-xs text-[#666666]">{item.reviewCount}개</div>
                </div>
              </Link>
            )
          })
        )}
      </section>
    </section>
  )
}
