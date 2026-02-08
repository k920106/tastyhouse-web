'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { MemberGradeCode } from '@/domains/member'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import MyPagePaymentItem from './MyPagePaymentItem'
import MyPagePlaceCard from './MyPagePlaceCard'
import MyPageProfile from './MyPageProfile'
import MyPageStats from './MyPageStats'
import MyPageHeader from './MyPageHeader'

type TabValue = 'reviews' | 'payments' | 'places'

// 임시 더미 데이터
const userData = {
  userName: '닉네임을뭐라고하지',
  userProfileImage: '/images/sample/profile/minji.png',
  grade: 'GOURMET' as MemberGradeCode,
  reviewCount: 0,
  followingCount: 0,
  followerCount: 0,
}

const dummyPayments: {
  id: number
  storeName: string
  productName: string
  price: number
  date: string
  status: '결제완료' | '사용완료' | '결제취소'
  storeImage: string
}[] = []

const dummyPlaces: {
  id: number
  placeImage: string
  region: string
  placeName: string
  rating: number
}[] = []

const TAB_TRIGGER_CLASS =
  'flex-1 h-full rounded-none border-0 border-b border-[#eeeeee] shadow-none cursor-pointer data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main'

interface MyPageContentProps {
  initialTab: TabValue
}

export default function MyPageContent({ initialTab }: MyPageContentProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      params.set('tab', value)
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname],
  )

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MyPageHeader />
        <MyPageProfile
          userName={userData.userName}
          userProfileImage={userData.userProfileImage}
          grade={userData.grade}
        />
        <MyPageStats
          reviewCount={userData.reviewCount}
          followingCount={userData.followingCount}
          followerCount={userData.followerCount}
        />
      </div>
      <Tabs
        value={initialTab}
        onValueChange={handleTabChange}
        className="flex-1 flex flex-col gap-0 min-h-[50dvh]"
      >
        <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
          <TabsTrigger value="reviews" className={TAB_TRIGGER_CLASS}>
            <Image
              src={`/images/mypage/icon-review-${initialTab === 'reviews' ? 'on' : 'off'}.png`}
              alt="리뷰"
              width={28}
              height={28}
            />
          </TabsTrigger>
          <TabsTrigger value="payments" className={TAB_TRIGGER_CLASS}>
            <Image
              src={`/images/mypage/icon-order-${initialTab === 'payments' ? 'on' : 'off'}.png`}
              alt="결제"
              width={28}
              height={28}
            />
          </TabsTrigger>
          <TabsTrigger value="places" className={TAB_TRIGGER_CLASS}>
            <Image
              src={`/images/mypage/icon-bookmark-${initialTab === 'places' ? 'on' : 'off'}.png`}
              alt="저장"
              width={28}
              height={28}
            />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="mt-0 flex-1 bg-[#f5f5f5]">
          <div className="flex flex-col items-center justify-center h-full pb-[70px]">
            <div className="relative w-[60px] h-[60px] mb-4">
              <Image
                src="/images/mypage/logo-gray.png"
                alt=""
                fill
                style={{ objectFit: 'contain' }}
                sizes="60px"
              />
            </div>
            <p className="text-gray-400 text-[15px]">등록된 리뷰가 없습니다.</p>
          </div>
        </TabsContent>
        <TabsContent value="payments" className="mt-0 flex-1 bg-[#f5f5f5]">
          {dummyPayments.length > 0 ? (
            <div className="pb-[70px]">
              {dummyPayments.map((payment) => (
                <MyPagePaymentItem
                  key={payment.id}
                  storeName={payment.storeName}
                  productName={payment.productName}
                  price={payment.price}
                  date={payment.date}
                  status={payment.status}
                  storeImage={payment.storeImage}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full pb-[70px]">
              <div className="relative w-[60px] h-[60px] mb-4">
                <Image
                  src="/images/mypage/logo-gray.png"
                  alt=""
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="60px"
                />
              </div>
              <p className="text-gray-400 text-[15px]">결제 내역이 없습니다.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="places" className="mt-0 flex-1 bg-[#f5f5f5]">
          {dummyPlaces.length > 0 ? (
            <div className="pb-[70px]">
              {dummyPlaces.map((place) => (
                <MyPagePlaceCard
                  key={place.id}
                  placeImage={place.placeImage}
                  region={place.region}
                  placeName={place.placeName}
                  rating={place.rating}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full pb-[70px]">
              <div className="relative w-[60px] h-[60px] mb-4">
                <Image
                  src="/images/mypage/logo-gray.png"
                  alt=""
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="60px"
                />
              </div>
              <p className="text-gray-400 text-[15px]">저장된 장소가 없습니다.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
