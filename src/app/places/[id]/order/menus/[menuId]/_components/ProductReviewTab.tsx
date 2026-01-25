'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { IoStar } from 'react-icons/io5'

interface Review {
  id: number
  userId: number
  userName: string
  userProfileImage: string | null
  rating: number
  content: string
  imageUrls: string[]
  createdAt: string
}

interface ProductReviewTabProps {
  productId: number
}

// TODO: 실제 API 연동 필요
async function fetchProductReviews(productId: number): Promise<Review[]> {
  // 임시 API 호출 시뮬레이션
  console.log('Fetching reviews for product:', productId)

  // 실제 API 연동 시:
  // const response = await fetch(`/api/products/${productId}/reviews`)
  // return response.json()

  // 임시 빈 배열 반환 (API 미구현)
  return []
}

export default function ProductReviewTab({ productId }: ProductReviewTabProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true)
        const data = await fetchProductReviews(productId)
        setReviews(data)
      } catch (err) {
        setError('리뷰를 불러오는데 실패했습니다.')
        console.error('Failed to fetch reviews:', err)
      } finally {
        setIsLoading(false)
      }
    }

    loadReviews()
  }, [productId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#aaaaaa] text-[14px]">리뷰를 불러오는 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#aaaaaa] text-[14px]">{error}</div>
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-[#aaaaaa] text-[14px]">아직 작성된 리뷰가 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="divide-y divide-[#eeeeee]">
      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  )
}

interface ReviewItemProps {
  review: Review
}

function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="px-4 py-4">
      {/* 유저 정보 */}
      <div className="flex items-center gap-2 mb-3">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#eeeeee]">
          {review.userProfileImage ? (
            <Image
              src={review.userProfileImage}
              alt={review.userName}
              fill
              className="object-cover"
              sizes="32px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#aaaaaa] text-[12px]">
              {review.userName.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="text-[14px] font-medium">{review.userName}</div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <IoStar
                key={star}
                className={`w-3 h-3 ${star <= review.rating ? 'text-[#FFD700]' : 'text-[#eeeeee]'}`}
              />
            ))}
          </div>
        </div>
        <div className="text-[12px] text-[#aaaaaa]">{formatDate(review.createdAt)}</div>
      </div>

      {/* 리뷰 내용 */}
      <p className="text-[14px] text-[#333333] leading-relaxed mb-3">{review.content}</p>

      {/* 리뷰 이미지 */}
      {review.imageUrls.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {review.imageUrls.map((url, index) => (
            <div
              key={index}
              className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden"
            >
              <Image src={url} alt={`리뷰 이미지 ${index + 1}`} fill className="object-cover" sizes="80px" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}.${month}.${day}`
}
