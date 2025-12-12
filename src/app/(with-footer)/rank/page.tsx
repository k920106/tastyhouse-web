'use client'

import Header from '@/components/layouts/Header'
import Image from 'next/image'
import { useState } from 'react'
import { MdInfo } from 'react-icons/md'

interface RankingProduct {
  rank: number
  name: string
  brand: string
  image: string
}

interface RankingUser {
  rank: number
  nickname: string
  memberLevel: string
  reviewCount: number
  avatar: string
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

const MOCK_USERS: RankingUser[] = [
  {
    rank: 1,
    nickname: '먹는게제일좋아',
    memberLevel: '테하멤버',
    reviewCount: 132,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 2,
    nickname: '낙네임이길어진다나네...',
    memberLevel: '미식멤버',
    reviewCount: 82,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 3,
    nickname: '먹는게제일좋아',
    memberLevel: '인싸멤버',
    reviewCount: 82,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 4,
    nickname: '낙네임01',
    memberLevel: '열심멤버',
    reviewCount: 22,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 5,
    nickname: '오늘도맛집탐험',
    memberLevel: '신입멤버',
    reviewCount: 51,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 6,
    nickname: '스시러버77',
    memberLevel: '신입멤버',
    reviewCount: 46,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 7,
    nickname: '달고나좋아',
    memberLevel: '신입멤버',
    reviewCount: 34,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 8,
    nickname: '주말은맛집투어',
    memberLevel: '신입멤버',
    reviewCount: 29,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 9,
    nickname: '맛집수집가',
    memberLevel: '신입멤버',
    reviewCount: 18,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 10,
    nickname: '커피사랑러',
    memberLevel: '신입멤버',
    reviewCount: 14,
    avatar: '/images/sample/profile-default.png',
  },
  {
    rank: 11,
    nickname: '푸드헌터',
    memberLevel: '신입멤버',
    reviewCount: 9,
    avatar: '/images/sample/profile-default.png',
  },
]

const getMemberLevelIcon = (memberLevel: string): string => {
  const levelMap: { [key: string]: string } = {
    신입멤버: '01', // #4a6db3
    열심멤버: '02', // #ed771f
    인싸멤버: '03', // #a5a5a5
    미식멤버: '04', // #a5a5a5
    테하멤버: '05', // --main-color
  }
  return levelMap[memberLevel] || '03'
}

const getMemberLevelColor = (memberLevel: string): string => {
  const colorMap: { [key: string]: string } = {
    신입멤버: 'text-[#4a6db3]',
    열심멤버: 'text-[#ed771f]',
    인싸멤버: 'text-[#a5a5a5]',
    미식멤버: 'text-[#f4aa14]',
    테하멤버: 'text-main',
  }
  return colorMap[memberLevel] || 'text-[#a5a5a5]'
}

export default function RankPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'monthly'>('all')

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
            {MOCK_USERS.map((user) => (
              <div
                key={`${user.rank}-${user.nickname}`}
                className="flex justify-between items-center py-[15px] pl-4 pr-5 bg-[#fcfcfc] border border-[#eeeeee] rounded-[2.5px]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 w-[22px] flex flex-col items-center">
                    {user.rank <= 3 ? (
                      <Image
                        src={`/images/rank/icon-rank-0${user.rank}.png`}
                        alt={`${user.rank}등`}
                        width={22}
                        height={30}
                      />
                    ) : (
                      <p className="text-xs">{user.rank}</p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <Image
                      src={user.avatar}
                      alt={user.nickname}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <p className="text-sm font-bold truncate">{user.nickname}</p>
                    <p className="flex items-center gap-[5px]">
                      <Image
                        src={`/images/rank/icon-level-${getMemberLevelIcon(user.memberLevel)}-40.png`}
                        alt=""
                        width={14}
                        height={14}
                      />
                      <span className={`text-xs ${getMemberLevelColor(user.memberLevel)}`}>
                        {user.memberLevel}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="text-xs text-[#666666]">{user.reviewCount}개</div>
              </div>
            ))}
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
                  src="/images/sample/profile-user.png"
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
                    src={`/images/rank/icon-level-${getMemberLevelIcon('테하멤버')}-40.png`}
                    alt="계급"
                    width={14}
                    height={14}
                  />
                  <span className={`text-xs ${getMemberLevelColor('테하멤버')}`}>테하멤버</span>
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
