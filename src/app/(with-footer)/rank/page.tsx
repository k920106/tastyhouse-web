'use client'

import Header from '@/components/layouts/Header'
import { ApiClient } from '@/lib/api-client'
import { ApiResponse } from '@/types/api/common'
import { MemberGrade, MemberRankItem, RankType } from '@/types/api/rank'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MdInfo } from 'react-icons/md'

interface RankingProduct {
  rank: number
  name: string
  brand: string
  image: string
}

const TOP_PRODUCTS: RankingProduct[] = [
  {
    rank: 1,
    name: 'Airpod Pro',
    brand: 'APPLE',
    image: '/images/rank/sample-airpod-pro.png',
  },
  {
    rank: 2,
    name: '돌체구스토 커피머신',
    brand: '네슬레 네스카페',
    image: '/images/rank/sample-nescafe.png',
  },
  {
    rank: 3,
    name: '아이스 아메리카노 Tall',
    brand: '스타벅스',
    image: '/images/rank/sample-starbucks.png',
  },
]

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

export default function RankPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'monthly'>('all')
  const [rankings, setRankings] = useState<MemberRankItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRankings = async () => {
      setIsLoading(true)
      try {
        const type: RankType = activeTab === 'all' ? 'ALL' : 'MONTHLY'
        const response = await ApiClient.get<ApiResponse<MemberRankItem[]>>('/ranks/v1/members', {
          type,
          limit: 100,
        })
        setRankings(response.data)
      } catch (error) {
        console.error('Failed to fetch rankings:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRankings()
  }, [activeTab])

  return (
    <>
      <Header>
        <h1 className="text-[17px] text-white">랭킹</h1>
      </Header>
      <div className="flex flex-col gap-2.5 min-h-screen bg-[#f9f9f9] pb-[140px]">
        <section className="px-7 py-[30px] bg-white">
          <div className="flex justify-between items-end gap-2">
            {TOP_PRODUCTS.map((product) => (
              <div key={product.rank} className="flex flex-col items-center flex-1 min-w-0">
                <div className="relative w-full mb-[15px] max-w-[144px] aspect-square">
                  <div className="absolute top-0 left-2 z-10 w-[20%] max-w-[70px]">
                    <Image
                      src={`/images/rank/icon-rank-0${product.rank}.png`}
                      alt={`${product.rank}등`}
                      width={60}
                      height={60}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="w-full h-full flex items-center justify-center bg-white border border-[#eeeeee] rounded-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-[55%] h-auto"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-center w-full px-1">
                  <p className="text-[11px] truncate">{product.brand}</p>
                  <p className="text-[11px] truncate">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-white px-4 py-5">
          <section className="mb-[25px]">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`text-lg font-bold ${
                    activeTab === 'all' ? '#333333' : 'text-[#333333]/50'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setActiveTab('monthly')}
                  className="flex items-center gap-2.5"
                >
                  <span
                    className={`text-lg font-bold ${activeTab === 'monthly' ? '#333333' : 'text-[#333333]/50'}`}
                  >
                    이번 달
                  </span>
                  <MdInfo size="20" color="#dddddd" />
                </button>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <div className="text-sm">남은기간 : 8일 1시간 25분</div>
                <div className="text-sm text-[#aaaaaa]">(2020.07.01 - 12.31)</div>
              </div>
            </div>
          </section>
          <section className="flex flex-col gap-2.5">
            {isLoading ? (
              <div className="text-center py-10 text-[#999999]">로딩 중...</div>
            ) : rankings.length === 0 ? (
              <div className="text-center py-10 text-[#999999]">랭킹 데이터가 없습니다.</div>
            ) : (
              rankings.map((item) => {
                const gradeDisplayName = getMemberGradeDisplayName(item.grade)
                const gradeIcon = getMemberGradeIcon(item.grade)
                const gradeColor = getMemberGradeColor(item.grade)

                return (
                  <div
                    key={item.memberId}
                    className="flex justify-between items-center py-[15px] pl-4 pr-5 bg-[#fcfcfc] border border-[#eeeeee] rounded-[2.5px]"
                  >
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
                          src={item.profileImageUrl || '/images/sample/profile-default.png'}
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
                )
              })
            )}
          </section>
        </section>
      </div>
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
    </>
  )
}
