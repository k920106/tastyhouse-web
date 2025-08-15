'use client'

import Image from 'next/image'
import { useState } from 'react'
import { MdOutlineArrowBackIos } from 'react-icons/md'

export default function ReviewCreatePage() {
  const [rating, setRating] = useState({ taste: 0, amount: 0, price: 0 })
  const [review, setReview] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [selectedImages, setSelectedImages] = useState<File[]>([])

  const handleRating = (category: 'taste' | 'amount' | 'price', score: number) => {
    setRating((prev) => ({ ...prev, [category]: score }))
  }

  const handleTagAdd = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag])
    }
  }

  const handleTagRemove = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files))
    }
  }

  const StarRating = ({ score, onRate }: { score: number; onRate: (rating: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`text-2xl ${star <= score ? 'text-red-500' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative flex items-center h-14 bg-white border-b border-border-main box-border">
        <button className="absolute top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer">
          <MdOutlineArrowBackIos size={20} />
        </button>
        <p className="absolute left-1/2 -translate-x-1/2 text-[17px]">리뷰작성</p>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col gap-2.5 bg-white px-4 py-6">
          <label className="text-xs text-gray-700" htmlFor="placeName">
            상호명 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full h-[50px] px-4 text-sm border border-border-input box-border focus:border-input-focus focus:ring-1 focus:ring-border-input-focus outline-none"
            id="placeName"
          ></input>
        </div>
        <div className="flex flex-col gap-2.5 bg-white px-4 py-6">
          <label className="text-xs text-gray-700" htmlFor="menuName">
            메뉴명
          </label>
          <input
            type="text"
            className="w-full h-[50px] px-4 text-sm border border-border-input box-border focus:border-input-focus focus:ring-1 focus:ring-border-input-focus outline-none"
            id="menuName"
          ></input>
        </div>
        <div className="flex flex-col gap-2.5 bg-white px-4 py-6">
          <label className="text-xs text-gray-700" htmlFor="placeName">
            내용 <span className="text-red-500">*</span>
          </label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="최소 20자 이상 입력해주세요"
            className="w-full h-32 px-4 py-[15px] text-sm border border-border-input box-border focus:border-input-focus focus:ring-1 focus:ring-border-input-focus outline-none resize-none"
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-400 mt-1">{review.length}/500</div>
        </div>

        {/* 사진 업로드 */}
        <div className="bg-white">
          <p className="text-gray-700 mb-3">사진</p>
          <div className="flex items-center gap-3">
            <label className="w-16 h-16 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <span className="text-2xl text-gray-400">📷</span>
            </label>
            {selectedImages.map((image, index) => (
              <div key={index} className="w-16 h-16 overflow-hidden">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`uploaded-${index}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">{selectedImages.length}/5</p>
          <p className="text-xs text-gray-400 mt-2">
            해당 음식과 무관한 사진을 첨부할 시 리뷰가 삭제 및 적립
            <br />
            혜택이 취소될 수 있습니다.
          </p>
        </div>

        {/* 태그 */}
        <div className="bg-white">
          <p className="text-gray-700 mb-3">태그를 입력하세요. (예: #맛집)</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
              >
                #{tag}
                <button onClick={() => handleTagRemove(tag)} className="ml-2 text-gray-500">
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleTagAdd('샌드위치')}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #샌드위치
            </button>
            <button
              onClick={() => handleTagAdd('아보카도')}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #아보카도
            </button>
          </div>
        </div>

        {/* 포인트 정보 */}
        <div className="bg-white">
          <h3 className="font-medium text-gray-800 mb-3">리뷰 작성시 포인트 적립 및 주의사항</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              • 일반(텍스트 및 내용)리뷰 작성시{' '}
              <span className="text-red-500 font-medium">100p 적립</span>
            </li>
            <li>
              • 포토리뷰 작성시 <span className="text-red-500 font-medium">200p 적립</span>
            </li>
            <li>• 주문한 상품만큼 리뷰 작성이 가능하며, 동일 상품 여러개 구매시 최초 1회의</li>
            <li className="ml-4">리뷰만 포인트 적립</li>
            <li>• 리뷰 삭제 후 재작성시 포인트 미지급</li>
          </ul>
        </div>

        {/* 등록하기 버튼 */}
        <button className="w-full bg-main text-white py-4 font-medium text-lg">등록하기</button>
      </div>
    </div>
  )
}
