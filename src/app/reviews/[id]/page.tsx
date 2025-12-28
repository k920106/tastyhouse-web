import { Comment, Review } from '@/types/api/review'
import { Suspense } from 'react'
import CommentSection from './_components/CommentSection'
import ReviewDetailHeader from './_components/ReviewDetailHeader'
import ReviewDetailSection from './_components/ReviewDetailSection'

// 임시 데이터
const mockReview: Review = {
  id: 1,
  userName: '먹는게제일좋아',
  userProfileImage: null,
  createdAt: '2024-01-13T08:00:00Z',
  images: [
    '/images/sample/food-image1.png',
    '/images/sample/food-image2.png',
    '/images/sample/food-image3.png',
    '/images/sample/food-image4.png',
    '/images/sample/food-image5.png',
  ],
  content:
    '샌드위치 종류는 햄치즈와 연어 두가지가 있었어요! 둘 다 아보카도가 기본으로 들어가는 샌드위치였습니다. 같이 간 친구가 연어를 못먹어서 햄치즈로 주문했는데, 햄치즈도 너무 맛있었어요! 그래놀라와 수제 요거트가 메인인줄 알았는데 숨겨진 샌드위치 맛집이네요? 다음엔 연어로 먹으러 다시 와야겠어요! 샌드위치는 두피스가 나오는데 처음에 보면 가격에 비해서 적다고 생각이 들 수 있지만 요거트와 같이 곁들여 먹으면 은근 배도부르고 맛있어서 용서될 수 있는 가격이에요! 꼭 드셔보시길 추천드립니다 @.@',
  likeCount: 0,
  commentCount: 3,
  hashtags: ['샌드위치', '아보카도', '브런치', '샌드위치', '아보카도', '브런치'],
}

const mockComments: Comment[] = [
  {
    id: 1,
    userName: '뽕수니',
    userProfileImage: null,
    content: '여긴 항상 웨이팅이 기본 30분이더라구요…? 눈물… 리뷰보니까 더 가고싶어졌어요 ㅠ..ㅠ!!',
    createdAt: '2024-01-13T09:00:00Z',
    replies: [
      {
        id: 2,
        userName: '먹는게제일좋아',
        userProfileImage: null,
        content: '여유있으시면 꼭 다녀오기를 추천드려요! ^ㅡ^',
        createdAt: '2024-01-13T09:30:00Z',
      },
    ],
  },
  {
    id: 3,
    userName: '푸드파이터',
    userProfileImage: null,
    content:
      '사진을 정말 맛있게 잘찍으시네요! 혹시 음식사진 어떤 카메라로 찍으시는지 여쭤봐도될까요!?',
    createdAt: '2024-01-13T10:00:00Z',
  },
]

export default function ReviewDetailPage() {
  return (
    <>
      <Suspense fallback={<div>제목</div>}>
        <ReviewDetailHeader userName={mockReview.userName} />
      </Suspense>
      <div className="pb-20">
        <Suspense fallback={<div>리뷰 상세</div>}>
          <ReviewDetailSection review={mockReview} />
        </Suspense>
        <Suspense fallback={<div>댓글</div>}>
          <CommentSection comments={mockComments} />
        </Suspense>
      </div>
    </>
  )
}
