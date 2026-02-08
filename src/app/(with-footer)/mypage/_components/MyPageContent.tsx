import { PaymentStatus } from '@/domains/payment'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'
import MyPageHeader from './MyPageHeader'
import MyPagePaymentItem from './MyPagePaymentItem'
import MyPagePlaceCard from './MyPagePlaceCard'
import MyPageProfile from './MyPageProfile'
import MyPageTabs from './MyPageTabs'

export type MyPageTabValue = 'reviews' | 'payments' | 'bookmarks'

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
  {
    id: 11,
    imagePath: '/images/sample/food/food-image3.png',
  },
  {
    id: 12,
    imagePath: '/images/sample/food/food-image4.png',
  },
  {
    id: 13,
    imagePath: '/images/sample/food/food-image5.png',
  },
  {
    id: 14,
    imagePath: '/images/sample/food/food-image6.png',
  },
  {
    id: 15,
    imagePath: '/images/sample/food/food-image7.png',
  },
  {
    id: 16,
    imagePath: '/images/sample/food/food-image8.png',
  },
]

const dummyPayments: {
  id: number
  storeName: string
  productName: string
  price: number
  date: string
  status: PaymentStatus
  storeImage: string
}[] = [
  {
    id: 1,
    storeName: '테스트 가게',
    productName: '테스트 상품',
    price: 10000,
    date: '2026-01-01',
    status: 'COMPLETED',
    storeImage: '/images/sample/place/place-image1.png',
  },
  {
    id: 2,
    storeName: '테스트 가게',
    productName: '테스트 상품',
    price: 10000,
    date: '2026-01-01',
    status: 'COMPLETED',
    storeImage: '/images/sample/place/place-image2.png',
  },
  {
    id: 3,
    storeName: '테스트 가게',
    productName: '테스트 상품',
    price: 10000,
    date: '2026-01-01',
    status: 'CANCELLED',
    storeImage: '/images/sample/place/place-image3.png',
  },
  {
    id: 4,
    storeName: '테스트 가게',
    productName: '테스트 상품',
    price: 10000,
    date: '2026-01-01',
    status: 'CANCELLED',
    storeImage: '/images/sample/place/place-image4.png',
  },
  {
    id: 5,
    storeName: '테스트 가게',
    productName: '테스트 상품',
    price: 10000,
    date: '2026-01-01',
    status: 'CANCELLED',
    storeImage: '/images/sample/place/place-image1.png',
  },
  {
    id: 6,
    storeName: '테스트 가게',
    productName: '테스트 상품',
    price: 10000,
    date: '2026-01-01',
    status: 'CANCELLED',
    storeImage: '/images/sample/place/place-image6.png',
  },
]

const dummyBookmarks: {
  id: number
  placeImage: string
  region: string
  placeName: string
  rating: number
  isBookmarked: boolean
}[] = [
  {
    id: 1,
    placeImage: '/images/sample/place/place-image1.png',
    region: '서울',
    placeName: '테스트 가게',
    rating: 4.5,
    isBookmarked: false,
  },
  {
    id: 2,
    placeImage: '/images/sample/place/place-image2.png',
    region: '서울',
    placeName: '테스트 가게',
    rating: 4.5,
    isBookmarked: true,
  },
  {
    id: 3,
    placeImage: '/images/sample/place/place-image3.png',
    region: '서울',
    placeName: '테스트 가게',
    rating: 4.5,
    isBookmarked: true,
  },
  {
    id: 4,
    placeImage: '/images/sample/place/place-image4.png',
    region: '서울',
    placeName: '테스트 가게',
    rating: 4.5,
    isBookmarked: true,
  },
  {
    id: 5,
    placeImage: '/images/sample/place/place-image1.png',
    region: '서울',
    placeName: '테스트 가게',
    rating: 4.5,
    isBookmarked: true,
  },
  {
    id: 6,
    placeImage: '/images/sample/place/place-image2.png',
    region: '서울',
    placeName: '테스트 가게',
    rating: 4.5,
    isBookmarked: true,
  },
]

interface MyPageContentProps {
  initialTab: MyPageTabValue
}

export default function MyPageContent({ initialTab }: MyPageContentProps) {
  const reviewsContent =
    dummyReviews.length > 0 ? (
      <>
        <div className="py-[1px]">
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
        <div className="h-[70px]"></div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center h-full pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">등록된 리뷰가 없습니다.</p>
        </div>
      </div>
    )

  const paymentsContent =
    dummyPayments.length > 0 ? (
      <>
        <div className="px-[15px] py-[5px] bg-white divide-y divide-[#eeeeee]">
          {dummyPayments.map((payment) => (
            <MyPagePaymentItem
              key={payment.id}
              id={payment.id}
              storeName={payment.storeName}
              productName={payment.productName}
              price={payment.price}
              date={payment.date}
              paymentStatus={payment.status}
              storeImage={payment.storeImage}
            />
          ))}
        </div>
        <div className="h-[70px]"></div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center h-full pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">결제 내역이 없습니다.</p>
        </div>
      </div>
    )

  const bookmarksContent =
    dummyBookmarks.length > 0 ? (
      <>
        <div className="flex flex-col gap-2.5 px-[15px] py-[20px]">
          {dummyBookmarks.map((bookmark) => (
            <MyPagePlaceCard
              key={bookmark.id}
              placeId={bookmark.id}
              placeImage={bookmark.placeImage}
              region={bookmark.region}
              placeName={bookmark.placeName}
              rating={bookmark.rating}
              isBookmarked={bookmark.isBookmarked}
            />
          ))}
        </div>
        <div className="h-[70px]"></div>
      </>
    ) : (
      <div className="flex flex-col items-center justify-center h-full pb-[70px]">
        <div className="relative w-[35px] h-[40px]">
          <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
        </div>
        <div className="mt-[15px]">
          <p className="text-sm leading-[14px] text-[#aaaaaa]">저장된 즐겨찾기가 없습니다.</p>
        </div>
      </div>
    )

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MyPageHeader />
        <MyPageProfile />
      </div>
      <MyPageTabs
        initialTab={initialTab}
        reviewsContent={reviewsContent}
        paymentsContent={paymentsContent}
        bookmarksContent={bookmarksContent}
      />
    </div>
  )
}
