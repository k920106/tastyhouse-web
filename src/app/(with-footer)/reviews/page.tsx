'use client'

import ReviewCard from '@/components/reviews/ReviewCard'
import ReviewPageHeader from '@/components/reviews/ReviewPageHeader'
import ReviewTabs from '@/components/reviews/ReviewTabs'
import { Review } from '@/types/api/review'
import { useState } from 'react'

// 임시 더미 데이터
const dummyReviews: Review[] = [
  {
    id: 1,
    userName: '먹는게제일좋아',
    userProfileImage: null,
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
    images: ['/images/sample/food-image1.png'],
    content:
      '샌드위치 종류는 햄치즈와 연어 두가지가 있었어요! 둘다 아보카도 가기본으로 들어가는 샌드위치였습니다. 같이 간 친구가 연어를 못먹어서 햄치즈로 주문했는데, 햄치즈도 너무 맛있었어요! 그놈라와 수제 요거트가 메인인줄 알았는데 숨겨진 샌드위치 맛집이네요? 다음엔 연어로 먹으러 다시 와야겠어요! 샌드위...',
    likeCount: 27,
    commentCount: 13,
    placeName: '카페이름',
    menuName: '샌드위치',
  },
  {
    id: 2,
    userName: '먹는게제일좋아',
    userProfileImage: null,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    images: ['/images/sample/food-image2.png'],
    content: '정말 맛있었어요! 재방문 의사 100%입니다.',
    likeCount: 15,
    commentCount: 8,
  },
]

export default function ReviewPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'following'>('all')

  return (
    <div className="min-h-screen bg-white">
      <ReviewPageHeader />
      <ReviewTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="pb-[70px]">
        {dummyReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
