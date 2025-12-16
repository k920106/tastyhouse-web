'use client'

import Image from 'next/image'
import { Review } from '@/types/api/review'
import { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'

interface ReviewCardProps {
  review: Review
}

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

export default function ReviewCard({ review }: ReviewCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
    <div className="bg-white border-b-[8px] border-gray-100 pb-4">
      {/* 사용자 정보 */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            {review.userProfileImage ? (
              <Image
                src={review.userProfileImage}
                alt={review.userName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300">
                <div className="w-6 h-6 rounded-full bg-white" />
              </div>
            )}
          </div>
          <div>
            <p className="text-[15px] font-bold">{review.userName}</p>
            <p className="text-[12px] text-gray-500">{formatTimeAgo(review.createdAt)}</p>
          </div>
        </div>
        <button className="p-2">
          <BsThreeDotsVertical size={20} className="text-gray-600" />
        </button>
      </div>

      {/* 이미지 갤러리 */}
      {review.images.length > 0 && (
        <div className="relative w-full aspect-square bg-gray-100">
          <Image
            src={review.images[currentImageIndex]}
            alt={`리뷰 이미지 ${currentImageIndex + 1}`}
            fill
            className="object-cover"
          />
          {review.images.length > 1 && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 text-white text-[13px] rounded-full">
              {currentImageIndex + 1}/{review.images.length}
            </div>
          )}
        </div>
      )}

      {/* 리뷰 내용 */}
      <div className="px-4 mt-3">
        <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{review.content}</p>
        {review.content.length > 100 && (
          <button className="text-[13px] text-gray-500 mt-1">더보기</button>
        )}
      </div>

      {/* 좋아요/댓글 통계 */}
      <div className="px-4 mt-3 flex items-center gap-4 text-[13px] text-gray-500">
        <span>좋아요 {review.likeCount}개</span>
        <span>댓글 {review.commentCount}개</span>
      </div>

      {/* 액션 버튼 */}
      <div className="px-4 mt-4 flex items-center gap-4">
        <button onClick={handleLike} className="flex items-center gap-1">
          {isLiked ? (
            <AiFillHeart size={24} className="text-red-500" />
          ) : (
            <AiOutlineHeart size={24} className="text-gray-700" />
          )}
        </button>
        <button className="flex items-center gap-1">
          <FaRegComment size={22} className="text-gray-700" />
        </button>
      </div>
    </div>
  )
}
