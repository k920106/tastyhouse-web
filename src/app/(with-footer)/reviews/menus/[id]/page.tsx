'use client'

import PhotoUploader from '@/components/reviews/PhotoUploader'
import ReviewInput from '@/components/reviews/ReviewInput'
import StarRating from '@/components/reviews/StarRating'
import SubmitButton from '@/components/reviews/SubmitButton'
import TagInput from '@/components/reviews/TagInput'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdOutlineArrowBackIos } from 'react-icons/md'

interface MenuReviewPageProps {
  params: {
    id: string
  }
}

export default function MenuReviewPage({ params }: MenuReviewPageProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    menuId: params.id,
    menuName: '아보카도 햄치즈 샌드위치',
    price: '8,500원',
    tasteRating: 0,
    quantityRating: 0,
    priceRating: 0,
    content: '',
    photos: [] as File[],
    tags: [] as string[],
  })

  type FormType = typeof form
  const handleChange = <K extends keyof FormType>(key: K, value: FormType[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const isFormValid = () => {
    return (
      form.tasteRating > 0 &&
      form.quantityRating > 0 &&
      form.priceRating > 0 &&
      form.content.trim().length >= 20 &&
      form.photos.length > 0
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="relative flex items-center h-14 bg-white border-b border-border-main box-border">
        <button
          className="absolute top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer"
          onClick={() => router.back()}
        >
          <MdOutlineArrowBackIos size={20} />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[17px]">리뷰작성</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {/* Menu Info */}
        <div className="flex items-center gap-4 px-4 py-6 bg-white">
          <div className="relative w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
            <Image src="/placeholder-food.jpg" alt={form.menuName} className="object-cover" fill />
          </div>
          <div className="flex-1">
            <p className=" text-gray-900">{form.menuName}</p>
            <p className="text-sm text-gray-600 mt-1">{form.price}</p>
          </div>
        </div>

        {/* Taste Rating */}
        <div className="px-4 py-6 bg-white">
          <p className="text-center  text-gray-900 mb-4">맛은 어떤가요?</p>
          <StarRating
            value={form.tasteRating}
            onChange={(val) => handleChange('tasteRating', val)}
          />
        </div>

        {/* Quantity Rating */}
        <div className="px-4 py-6 bg-white">
          <p className="text-center  text-gray-900 mb-4">양은 어떤가요?</p>
          <StarRating
            value={form.quantityRating}
            onChange={(val) => handleChange('quantityRating', val)}
          />
        </div>

        {/* Price Rating */}
        <div className="px-4 py-6 bg-white">
          <p className="text-center  text-gray-900 mb-4">가격은 어떤가요?</p>
          <StarRating
            value={form.priceRating}
            onChange={(val) => handleChange('priceRating', val)}
          />
        </div>

        {/* Review Content */}
        <ReviewInput value={form.content} onChange={(val) => handleChange('content', val)} />

        {/* Photo Upload */}
        <PhotoUploader value={form.photos} onChange={(val) => handleChange('photos', val)} />

        {/* Tags */}
        <TagInput value={form.tags} onChange={(val) => handleChange('tags', val)} />

        {/* Guidelines */}
        <div className="px-4 py-6 bg-white">
          <p className="text-gray-900 mb-3">리뷰 작성시 포인트 적립 및 주의사항</p>
          <ul className="space-y-2">
            <li className="text-xs text-gray-700">
              • 일반(평점 및 내용)리뷰 작성시 <span className="text-red-500">100p 적립</span>
            </li>
            <li className="text-xs text-gray-700">
              • 포토리뷰 작성시 <span className="text-red-500">200p 적립</span>
            </li>
            <li className="text-xs text-gray-700">
              • 주문한 상품별로 리뷰 작성이 가능하며, 동일 상품 여러개 구매시 최초 1회의 한해 포인트
              적립
            </li>
            <li className="text-xs text-gray-700">• 리뷰 삭제 후 재작성시 포인트 미지급</li>
          </ul>
        </div>

        {/* Submit Button */}
        <SubmitButton form={form} disabled={!isFormValid()} />
      </div>
    </div>
  )
}
