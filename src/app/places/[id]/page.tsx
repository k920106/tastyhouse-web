'use client'

import { formatDecimal } from '@/lib/number'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { BiCopy } from 'react-icons/bi'
import { FiBookmark } from 'react-icons/fi'
import { IoChevronBack, IoShareOutline } from 'react-icons/io5'
import { MdLocationOn } from 'react-icons/md'

type Tab = '정보' | '메뉴' | '포토' | '리뷰'

// Mock data
const MOCK_PLACE = {
  id: 1,
  name: '리틀넥 청담',
  rating: 4.8,
  address: '서울 강남구 도산대로51길 17',
  oldAddress: '[지번] 서울 강남구 신사동 653-7',
  imageUrl: '/images/sample/place-sample-02.jpg',
  ownerComment: '사장님의 한마디는 환율만 노출됩니다. 사장님의 한마디는 환율...',
  hours: {
    weekday: '평일 11:00~22:00',
    saturday: '토요일 10:00~23:00',
    sunday: '일요일 10:00~22:00',
  },
  breakTime: '매일 15:00~17:00',
  closed: '연중무휴',
  phone: '02-1234-5678',
  amenities: ['주차', '포장', '배달'],
  reviewCount: 99,
  totalReviews: 1024,
  ratingBreakdown: {
    5: 5,
    4: 4,
    3: 3,
    2: 2,
    1: 1,
  },
  ratingDetails: {
    atmosphere: 3.8,
    friendliness: 3.6,
    cleanliness: 3.9,
    taste: 3.8,
    quantity: 3.6,
    price: 3.9,
  },
  hasVisited: '있어요 (87%)',
}

const MOCK_MENUS = [
  {
    id: 1,
    name: '명란 크림 파스타',
    price: 18000,
    originalPrice: 18500,
    discount: 10,
    rating: 3.5,
    reviewCount: 24,
    imageUrl: '/images/sample/place-sample-01.jpg',
    isHot: true,
  },
  {
    id: 2,
    name: '명란 크림 파스타',
    price: 18000,
    originalPrice: 18500,
    discount: 10,
    rating: 3.5,
    reviewCount: 24,
    imageUrl: '/images/sample/place-sample-01.jpg',
    isHot: true,
  },
]

const MOCK_PHOTOS = ['/images/sample/place-sample-01.jpg']

const MOCK_REVIEWS = [
  {
    id: 1,
    userName: '먹는게제일좋아',
    userProfileImage: null,
    createdAt: '1시간 전',
    rating: 3.5,
    content:
      '[선택] 아보카도 햄치즈 샌드위치\n\n샌드위치 종류는 햄치즈와 연어 두가지가 있었어요! 졸려 아보카도 가기보는 들어가는 샌드위치였습니다. 같이 간친구가 연어를 못 먹어서 햄치즈도 주문했는데,햄치즈도 너무 맛있었어요! 그렇놀리와 수제 요거트가 메인인줄 알았는데 슴겨진 샌드위치 맛 집이네요? 다음엔 연어로 먹어야지 와외었어요! 샌드위...',
    images: ['/images/sample/place-sample-01.jpg'],
    photoCount: 5,
  },
]

export default function PlaceDetailPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('정보')
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between h-[60px] px-4 bg-white">
        <button onClick={() => router.back()} className="p-2 -ml-2">
          <IoChevronBack size={24} />
        </button>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px]">{MOCK_PLACE.name}</h1>
        <div className="flex items-center gap-2">
          <button className="p-2">
            <IoShareOutline size={24} />
          </button>
          <button className="p-2 -mr-2 relative">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Image
                src="/images/icon-cart.png"
                alt="장바구니"
                width={44}
                height={44}
                className="z-1"
              />
              <span className="absolute top-2 right-1 flex items-center justify-center w-4 h-4 text-[10px] text-white bg-main">
                99
              </span>
            </div>
          </button>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative w-full aspect-[16/9]">
        <Image src={MOCK_PLACE.imageUrl} alt={MOCK_PLACE.name} fill className="object-cover" />
      </div>

      {/* Place Info */}
      <div className="px-4 py-5 border-b-[6px] border-[#f5f5f5]">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-[19px]">{MOCK_PLACE.name}</h2>
          <span className="text-[26px] text-main">{formatDecimal(MOCK_PLACE.rating, 1)}</span>
        </div>

        <div className="mb-3">
          <div className="flex items-start gap-1 text-[15px] leading-[1.6] mb-1">
            <MdLocationOn size={18} className="text-main mt-0.5 flex-shrink-0" />
            <span>{MOCK_PLACE.address}</span>
            <button className="p-1 -mr-1">
              <BiCopy size={16} className="text-main" />
            </button>
          </div>
          <div className="text-[13px] text-[#999999] pl-[19px]">{MOCK_PLACE.oldAddress}</div>
        </div>

        <div className="flex items-center gap-3 text-[13px]">
          <button className="flex items-center gap-1 text-main">
            <MdLocationOn size={16} />
            <span>지도</span>
          </button>
          <button className="flex items-center gap-1 text-main">
            <BiCopy size={16} />
            <span>복사</span>
          </button>
        </div>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-5 right-4 p-2 bg-white rounded-full shadow-md"
        >
          <FiBookmark size={24} className={isBookmarked ? 'fill-main text-main' : ''} />
        </button>
      </div>

      {/* Tabs */}
      <div className="sticky top-[60px] z-40 bg-white border-b border-[#eeeeee]">
        <div className="flex">
          {(['정보', '메뉴', '포토', '리뷰'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 text-[15px] ${
                activeTab === tab
                  ? 'text-black border-b-2 border-black'
                  : 'text-[#999999] border-b-2 border-transparent box-border'
              }`}
            >
              {tab}
              {tab === '리뷰' && ` (${MOCK_PLACE.reviewCount}+)`}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4">
        {activeTab === '정보' && (
          <div className="py-6 space-y-8">
            {/* Owner Comment */}
            <div>
              <div className="inline-block px-3 py-1.5 mb-3 text-[13px] text-white bg-main rounded-full">
                사장님 한마디
              </div>
              <p className="text-[15px] leading-[1.6]">{MOCK_PLACE.ownerComment}</p>
            </div>

            {/* Hours */}
            <div>
              <h3 className="mb-3 text-[15px]">운영시간</h3>
              <div className="space-y-2 text-[15px] text-[#666666]">
                <div className="flex justify-between">
                  <span>평일</span>
                  <span>{MOCK_PLACE.hours.weekday.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span>토요일</span>
                  <span>{MOCK_PLACE.hours.saturday.split(' ')[1]}</span>
                </div>
                <div className="flex justify-between">
                  <span>일요일</span>
                  <span>{MOCK_PLACE.hours.sunday.split(' ')[1]}</span>
                </div>
              </div>
            </div>

            {/* Break Time */}
            <div>
              <h3 className="mb-3 text-[15px]">브레이크타임</h3>
              <p className="text-[15px] text-[#666666]">{MOCK_PLACE.breakTime.split(' ')[1]}</p>
            </div>

            {/* Closed */}
            <div>
              <h3 className="mb-3 text-[15px]">휴무일</h3>
              <p className="text-[15px] text-[#666666]">{MOCK_PLACE.closed}</p>
            </div>

            {/* Phone */}
            <div>
              <h3 className="mb-3 text-[15px]">전화번호</h3>
              <p className="text-[15px] text-[#666666]">{MOCK_PLACE.phone}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="mb-4 text-[15px]">편의시설</h3>
              <div className="grid grid-cols-3 gap-3">
                {MOCK_PLACE.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex flex-col items-center justify-center h-[100px] border border-main rounded-lg"
                  >
                    <div className="mb-2 text-[32px] text-main">
                      {amenity === '주차' && 'P'}
                      {amenity === '포장' && '🛍️'}
                      {amenity === '배달' && '🛵'}
                    </div>
                    <div className="text-[15px] text-main">{amenity}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === '메뉴' && (
          <div className="py-6">
            <h3 className="mb-4 text-[17px]">대표 메뉴</h3>
            <div className="space-y-4">
              {MOCK_MENUS.map((menu) => (
                <div
                  key={menu.id}
                  className="flex gap-3 pb-4 border-b border-[#eeeeee] last:border-0"
                >
                  <div className="relative w-[100px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={menu.imageUrl} alt={menu.name} fill className="object-cover" />
                    {menu.isHot && (
                      <div className="absolute top-2 left-2 flex gap-0.5">
                        <span className="text-main text-xl">🌶️</span>
                        <span className="text-main text-xl">🌶️</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="mb-1 text-[15px]">{menu.name}</h4>
                      <div className="flex items-center gap-2 text-[13px]">
                        <span className="text-[17px]">{menu.price.toLocaleString()}원</span>
                        <span className="text-[#999999] line-through">
                          {menu.originalPrice.toLocaleString()}원
                        </span>
                        <span className="text-main">{menu.discount}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <span className="text-[17px] text-main">{formatDecimal(menu.rating, 1)}</span>
                      <span className="text-[13px] text-[#999999]">리뷰 ({menu.reviewCount})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 mt-6 text-[15px] text-white bg-main rounded-lg">
              주문하기
            </button>
          </div>
        )}

        {activeTab === '포토' && (
          <div className="py-6">
            <h3 className="mb-4 text-[15px]">가게외관</h3>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
              <Image src={MOCK_PHOTOS[0]} alt="가게외관" fill className="object-cover" />
              <div className="absolute bottom-3 right-3 px-2 py-1 text-[13px] text-white bg-black/50 rounded">
                1/10
              </div>
            </div>
            <h3 className="mt-8 mb-4 text-[15px]">가게 내부</h3>
          </div>
        )}

        {activeTab === '리뷰' && (
          <div className="py-6">
            {/* Rating Summary */}
            <div className="pb-6 mb-6 border-b-[6px] border-[#f5f5f5] -mx-4 px-4">
              <div className="flex items-end gap-4 mb-6">
                <div className="text-[48px]">{formatDecimal(MOCK_PLACE.rating, 1)}</div>
                <div className="pb-2 text-[15px] text-[#666666]">/ 5</div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {[1, 2, 3, 4].map((star) => (
                  <span key={star} className="text-main text-2xl">
                    ⭐
                  </span>
                ))}
                <span className="text-[#ddd] text-2xl">⭐</span>
              </div>

              <div className="mb-6 text-[13px] text-[#666666]">
                {MOCK_PLACE.totalReviews.toLocaleString()} 개의 리뷰
              </div>

              <div className="flex items-center gap-8 mb-6">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex flex-col items-center">
                    <div className="mb-2 text-[13px] text-[#666666]">{star}점</div>
                    <div className="w-[2px] h-[60px] bg-[#eeeeee] relative">
                      <div
                        className="absolute bottom-0 left-0 right-0 bg-main"
                        style={{
                          height: `${(MOCK_PLACE.ratingBreakdown[star as keyof typeof MOCK_PLACE.ratingBreakdown] / 5) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Rating Details */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-8">
                {[
                  { label: '분위기', value: MOCK_PLACE.ratingDetails.atmosphere },
                  { label: '맛', value: MOCK_PLACE.ratingDetails.taste },
                  { label: '친절', value: MOCK_PLACE.ratingDetails.friendliness },
                  { label: '양', value: MOCK_PLACE.ratingDetails.quantity },
                  { label: '위생', value: MOCK_PLACE.ratingDetails.cleanliness },
                  { label: '가격', value: MOCK_PLACE.ratingDetails.price },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[13px] text-[#666666]">{item.label}</span>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4].map((star) => (
                        <span key={star} className="text-main text-sm">
                          ⭐
                        </span>
                      ))}
                      <span className="text-[15px] text-main">{formatDecimal(item.value, 1)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-[13px]">
                <span className="text-[#666666]">재방문의사</span>
                <span className="ml-2 text-main">{MOCK_PLACE.hasVisited}</span>
              </div>
            </div>

            {/* Review Filters */}
            <div className="flex gap-2 mb-6">
              {['전체', '1점', '2점', '3점', '4점'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 text-[13px] rounded-full border ${
                    filter === '전체' ? 'border-main text-main' : 'border-[#eeeeee] text-[#666666]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Review Sort */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-[#eeeeee]">
              <input type="checkbox" id="photo-review" className="w-4 h-4" />
              <label htmlFor="photo-review" className="text-[13px] text-[#666666]">
                포토리뷰 (42)
              </label>
              <div className="flex-1" />
              <button className="flex items-center gap-1 text-[13px] text-[#666666]">
                최신순
                <IoChevronBack size={14} className="rotate-[-90deg]" />
              </button>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {MOCK_REVIEWS.map((review) => (
                <div key={review.id} className="pb-6 border-b border-[#eeeeee]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-[15px]">{review.userName}</div>
                      <div className="text-[13px] text-[#999999]">{review.createdAt}</div>
                    </div>
                    <div className="text-[19px] text-main">{formatDecimal(review.rating, 1)}</div>
                  </div>

                  <p className="mb-3 text-[15px] leading-[1.6] line-clamp-4">{review.content}</p>

                  {review.images.length > 0 && (
                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                      <Image
                        src={review.images[0]}
                        alt="리뷰 이미지"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-3 right-3 px-2 py-1 text-[13px] text-white bg-black/50 rounded">
                        1/{review.photoCount}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
