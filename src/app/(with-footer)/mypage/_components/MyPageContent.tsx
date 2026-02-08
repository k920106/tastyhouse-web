'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import { MemberGradeCode } from '@/domains/member'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import MyPageHeader from './MyPageHeader'
import MyPagePaymentItem from './MyPagePaymentItem'
import MyPagePlaceCard from './MyPagePlaceCard'
import MyPageProfile from './MyPageProfile'

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

const dummyReviews: {
  id: number
  imagePath: string
}[] = [
  {
    id: 1,
    imagePath: '/images/sample/food/food-image1.png',
  },
  {
    id: 2,
    imagePath: '/images/sample/food/food-image2.png',
  },
  {
    id: 3,
    imagePath: '/images/sample/food/food-image3.png',
  },
  {
    id: 4,
    imagePath: '/images/sample/food/food-image4.png',
  },
  {
    id: 5,
    imagePath: '/images/sample/food/food-image5.png',
  },
  {
    id: 6,
    imagePath: '/images/sample/food/food-image6.png',
  },
  {
    id: 7,
    imagePath: '/images/sample/food/food-image7.png',
  },
  {
    id: 8,
    imagePath: '/images/sample/food/food-image8.png',
  },
  {
    id: 9,
    imagePath: '/images/sample/food/food-image1.png',
  },
  {
    id: 10,
    imagePath: '/images/sample/food/food-image2.png',
  },
]

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
          reviewCount={userData.reviewCount}
          followingCount={userData.followingCount}
          followerCount={userData.followerCount}
        />
      </div>
      <div className="flex-1 flex flex-col border-t border-[#eeeeee]">
        <Tabs value={initialTab} onValueChange={handleTabChange} className="gap-0 min-h-[50dvh]">
          <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
            <TabsTrigger value="reviews" className={TAB_TRIGGER_CLASS}>
              <Image
                src={`/images/mypage/icon-review-${initialTab === 'reviews' ? 'on' : 'off'}.png`}
                alt="리뷰"
                width={22}
                height={25}
              />
            </TabsTrigger>
            <TabsTrigger value="payments" className={TAB_TRIGGER_CLASS}>
              <Image
                src={`/images/mypage/icon-order-${initialTab === 'payments' ? 'on' : 'off'}.png`}
                alt="결제"
                width={34}
                height={25}
              />
            </TabsTrigger>
            <TabsTrigger value="bookmarks" className={TAB_TRIGGER_CLASS}>
              <Image
                src={`/images/mypage/icon-bookmark-${initialTab === 'places' ? 'on' : 'off'}.png`}
                alt="저장"
                width={27}
                height={25}
              />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="mt-0 flex-1 bg-[#f9f9f9]">
            {dummyReviews.length > 0 ? (
              <div className="pt-[1px] pb-[70px]">
                <div className="grid grid-cols-3 gap-[1.5px]">
                  {dummyReviews.map((review) => (
                    <Link
                      key={review.id}
                      href={PAGE_PATHS.REVIEW_DETAIL(review.id)}
                      className="relative aspect-square"
                    >
                      <Image
                        src={review.imagePath}
                        alt="리뷰 이미지"
                        fill
                        sizes="33vw"
                        className="object-cover"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full pb-[70px]">
                <div className="relative w-[35px] h-[40px]">
                  <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
                </div>
                <div className="mt-[15px]">
                  <p className="text-sm leading-[14px] text-[#aaaaaa]">등록된 리뷰가 없습니다.</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="payments" className="mt-0 flex-1 bg-[#f9f9f9]">
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
                <div className="relative w-[35px] h-[40px]">
                  <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
                </div>
                <div className="mt-[15px]">
                  <p className="text-sm leading-[14px] text-[#aaaaaa]">결제 내역이 없습니다.</p>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="bookmarks" className="mt-0 flex-1 bg-[#f9f9f9]">
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
                <div className="relative w-[35px] h-[40px]">
                  <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
                </div>
                <div className="mt-[15px]">
                  <p className="text-sm leading-[14px] text-[#aaaaaa]">
                    저장된 즐겨찾기가 없습니다.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
