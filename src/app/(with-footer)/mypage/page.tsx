'use client'

import MyPageHeader from '@/components/mypage/MyPageHeader'
import MyPageProfile from '@/components/mypage/MyPageProfile'
import MyPageStats from '@/components/mypage/MyPageStats'
import MyPageTabs from '@/components/mypage/MyPageTabs'
import MyPageReviewItem from '@/components/mypage/MyPageReviewItem'
import MyPagePaymentItem from '@/components/mypage/MyPagePaymentItem'
import MyPagePlaceCard from '@/components/mypage/MyPagePlaceCard'
import { useState } from 'react'

// 임시 더미 데이터
const userData = {
  userName: '닉네임을뭐라고하지',
  userProfileImage: null,
  memberBadge: '미식멤버',
  description: '상태메세지는 뭐라고 입력해야하지',
  reviewCount: 214,
  followingCount: 0,
  followerCount: 0,
}

const dummyReviewUsers = [
  {
    id: 1,
    userName: '다른사용자프로필',
    userProfileImage: null,
    reviewCount: 7,
    images: Array(7).fill('/images/sample/food-image1.png'),
  },
]

const dummyPayments = [
  {
    id: 1,
    storeName: '맹스오트',
    productName: '베리 스트로베리 외 2건',
    price: 20400,
    date: '20. 08. 24',
    status: '결제완료' as const,
    storeImage: '/images/sample/store-image1.png',
  },
  {
    id: 2,
    storeName: '맹스오트',
    productName: '베리 스트로베리 외 2건',
    price: 20400,
    date: '20. 08. 24',
    status: '사용완료' as const,
    storeImage: '/images/sample/store-image1.png',
  },
  {
    id: 3,
    storeName: '맹스오트',
    productName: '베리 스트로베리 외 2건',
    price: 20400,
    date: '20. 08. 24',
    status: '결제취소' as const,
    storeImage: '/images/sample/store-image1.png',
  },
]

const dummyPlaces = [
  {
    id: 1,
    placeImage: '/images/sample/place-image1.png',
    region: '망원역',
    placeName: '비전스트롤',
    rating: 4.5,
  },
  {
    id: 2,
    placeImage: '/images/sample/place-image1.png',
    region: '망원역',
    placeName: '비전스트롤',
    rating: 4.5,
  },
]

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<'reviews' | 'payments' | 'places'>('reviews')

  return (
    <div className="min-h-screen bg-white">
      <MyPageHeader />
      <MyPageProfile
        userName={userData.userName}
        userProfileImage={userData.userProfileImage}
        memberBadge={userData.memberBadge}
        description={userData.description}
        reviewCount={userData.reviewCount}
      />
      <MyPageStats
        reviewCount={userData.reviewCount}
        followingCount={userData.followingCount}
        followerCount={userData.followerCount}
      />
      <MyPageTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 탭 컨텐츠 */}
      <div className="pb-[70px]">
        {activeTab === 'reviews' && (
          <div>
            {dummyReviewUsers.length > 0 ? (
              dummyReviewUsers.map((user) => (
                <MyPageReviewItem
                  key={user.id}
                  userProfileImage={user.userProfileImage}
                  userName={user.userName}
                  reviewCount={user.reviewCount}
                  images={user.images}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 mb-4">
                  <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
                    <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-[15px]">등록된 리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            {dummyPayments.length > 0 ? (
              dummyPayments.map((payment) => (
                <MyPagePaymentItem
                  key={payment.id}
                  storeName={payment.storeName}
                  productName={payment.productName}
                  price={payment.price}
                  date={payment.date}
                  status={payment.status}
                  storeImage={payment.storeImage}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 mb-4">
                  <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
                    <rect x="10" y="30" width="80" height="50" rx="5" />
                    <rect x="10" y="40" width="80" height="15" className="fill-gray-400" />
                  </svg>
                </div>
                <p className="text-gray-400 text-[15px]">결제 내역이 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'places' && (
          <div>
            {dummyPlaces.length > 0 ? (
              dummyPlaces.map((place) => (
                <MyPagePlaceCard
                  key={place.id}
                  placeImage={place.placeImage}
                  region={place.region}
                  placeName={place.placeName}
                  rating={place.rating}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 mb-4">
                  <svg viewBox="0 0 100 100" className="text-gray-300 fill-current">
                    <path d="M50 10 C35 10 25 20 25 35 C25 55 50 80 50 80 C50 80 75 55 75 35 C75 20 65 10 50 10 Z" />
                    <circle cx="50" cy="35" r="8" className="fill-white" />
                  </svg>
                </div>
                <p className="text-gray-400 text-[15px]">저장된 장소가 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
