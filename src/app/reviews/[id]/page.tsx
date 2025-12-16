'use client'

import { Comment, Review } from '@/types/api/review'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { IoChevronBackOutline } from 'react-icons/io5'

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
    '샌드위치 종류는 햄치즈와 연어 두가지가 있었어요! 돌다야보카도 가기본으로 들어가는 샌드위치였습니다. 같이 간 친구가 연어를 못먹어서 햄치즈로 주문했는데, 햄치즈도 너무 맛있었어요! 그래놀라와 수제 요거트가 메인인줄 알았는데 숨겨진 샌드위치 맛집이네요? 다음엔 연어로 먹으러 다시 와야겠어요! 샌드위치는 두피스가 나오는데 처음에 보면 가격에 비해서 적다고 생각이 들 수 있지만 요거트와 같이 결들어 먹으면 은근 배도부르고 맛있어서 융서될 수 있는 가격이에요! 꼭 드셔보시길 추천드립니다 @.@',
  likeCount: 0,
  commentCount: 3,
  hashtags: ['샌드위치', '야보카도', '브런치'],
}

const mockComments: Comment[] = [
  {
    id: 1,
    userName: '뽕수니',
    userProfileImage: null,
    content: '여긴 항상 웨이팅이 기본 30분이더라구요…? 3능분… 리뷰보니까 더 가고싶어졌어요 ㅠㅠ!!',
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
      '사진을 정말 맛있게! 찍으시네요! 혹시 음식사진 어떤 카메라로 찍으시는지 여쭤봐도 될까요?',
    createdAt: '2024-01-13T10:00:00Z',
  },
]

function formatTimeAgo(dateString: string) {
  const now = new Date()
  const past = new Date(dateString)
  const diffInMs = now.getTime() - past.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInMinutes < 1) return '방금 전'
  if (diffInMinutes < 60) return `${diffInMinutes}분 전`
  if (diffInHours < 24) return `${diffInHours}시간 전`
  if (diffInDays < 7) return `${diffInDays}일 전`

  return past.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
}

export default function ReviewDetailPage() {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [commentText, setCommentText] = useState('')

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleSubmitComment = () => {
    // TODO: 댓글 등록 API 호출
    setCommentText('')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => router.back()} className="p-1">
            <IoChevronBackOutline size={24} className="text-gray-900" />
          </button>
          <h1 className="text-[17px] font-semibold">{mockReview.userName}님의 리뷰</h1>
          <div className="w-6" />
        </div>
      </header>

      {/* 리뷰 내용 */}
      <div className="pb-20">
        {/* 사용자 정보 */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full bg-pink-200 overflow-hidden">
              {mockReview.userProfileImage ? (
                <Image
                  src={mockReview.userProfileImage}
                  alt={mockReview.userName}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full bg-white" />
                </div>
              )}
            </div>
            <div>
              <p className="text-[15px] font-bold">{mockReview.userName}</p>
              <p className="text-[13px] text-gray-500">{formatTimeAgo(mockReview.createdAt)}</p>
            </div>
          </div>
          <button className="p-2">
            <BsThreeDotsVertical size={20} className="text-gray-600" />
          </button>
        </div>

        {/* 이미지 갤러리 */}
        {mockReview.images.length > 0 && (
          <div className="relative w-full aspect-square bg-gray-100">
            <Image
              src={mockReview.images[currentImageIndex]}
              alt={`리뷰 이미지 ${currentImageIndex + 1}`}
              fill
              className="object-cover"
            />
            {mockReview.images.length > 1 && (
              <>
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-[13px] rounded-full font-medium">
                  {currentImageIndex + 1}/{mockReview.images.length}
                </div>
                {/* 이미지 네비게이션 */}
                <div className="absolute inset-0 flex">
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev > 0 ? prev - 1 : mockReview.images.length - 1,
                      )
                    }
                    className="flex-1"
                  />
                  <button
                    onClick={() =>
                      setCurrentImageIndex((prev) =>
                        prev < mockReview.images.length - 1 ? prev + 1 : 0,
                      )
                    }
                    className="flex-1"
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* 좋아요/댓글 버튼 */}
        <div className="px-4 mt-4 flex items-center gap-3">
          <button onClick={handleLike} className="flex items-center gap-1">
            {isLiked ? (
              <AiFillHeart size={26} className="text-red-500" />
            ) : (
              <AiOutlineHeart size={26} className="text-gray-700" />
            )}
            <span className="text-[14px] text-gray-700 ml-0.5">좋아요</span>
          </button>
          <button className="flex items-center gap-1">
            <FaRegComment size={23} className="text-gray-700" />
            <span className="text-[14px] text-gray-700 ml-0.5">댓글</span>
          </button>
        </div>

        {/* 리뷰 내용 */}
        <div className="px-4 mt-4">
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap text-gray-900">
            {mockReview.content}
          </p>
        </div>

        {/* 해시태그 */}
        {mockReview.hashtags && mockReview.hashtags.length > 0 && (
          <div className="px-4 mt-4 flex flex-wrap gap-2">
            {mockReview.hashtags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-gray-100 text-gray-700 text-[13px] rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 댓글 섹션 */}
        <div className="mt-8 border-t-[6px] border-gray-100">
          <div className="px-4 py-4">
            <h2 className="text-[15px] font-semibold text-gray-900 mb-4">
              댓글 {mockComments.length}개
            </h2>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {mockComments.map((comment) => (
                <div key={comment.id}>
                  {/* 댓글 */}
                  <div className="flex gap-3">
                    <div className="relative w-9 h-9 rounded-full bg-blue-200 overflow-hidden flex-shrink-0">
                      {comment.userProfileImage ? (
                        <Image
                          src={comment.userProfileImage}
                          alt={comment.userName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-5 h-5 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold text-gray-900">
                          {comment.userName}
                        </span>
                        <span className="text-[12px] text-gray-500">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-[14px] text-gray-900 mt-1 leading-relaxed">
                        {comment.content}
                      </p>
                      <button className="text-[13px] text-gray-500 mt-2">답글달기</button>
                    </div>
                    <button className="p-1">
                      <BsThreeDotsVertical size={16} className="text-gray-500" />
                    </button>
                  </div>

                  {/* 답글 */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-12 mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="relative w-9 h-9 rounded-full bg-pink-200 overflow-hidden flex-shrink-0">
                            {reply.userProfileImage ? (
                              <Image
                                src={reply.userProfileImage}
                                alt={reply.userName}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-5 h-5 rounded-full bg-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-semibold text-gray-900">
                                {reply.userName}
                              </span>
                              <span className="text-[12px] text-gray-500">
                                {formatTimeAgo(reply.createdAt)}
                              </span>
                            </div>
                            <p className="text-[14px] text-gray-900 mt-1 leading-relaxed">
                              {reply.content}
                            </p>
                            <button className="text-[13px] text-gray-500 mt-2">답글달기</button>
                          </div>
                          <button className="p-1">
                            <BsThreeDotsVertical size={16} className="text-gray-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 댓글 입력창 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="relative w-9 h-9 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-white" />
            </div>
          </div>
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="flex-1 text-[15px] outline-none placeholder:text-gray-400"
          />
          {commentText.trim() && (
            <button
              onClick={handleSubmitComment}
              className="text-[14px] font-semibold text-blue-500"
            >
              게시
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
