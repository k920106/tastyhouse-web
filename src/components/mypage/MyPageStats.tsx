'use client'

interface MyPageStatsProps {
  reviewCount: number
  followingCount: number
  followerCount: number
}

export default function MyPageStats({
  reviewCount,
  followingCount,
  followerCount,
}: MyPageStatsProps) {
  return (
    <div className="flex items-center justify-center gap-12 py-6 bg-white border-b-[8px] border-gray-100">
      <button className="flex flex-col items-center gap-1">
        <span className="text-[16px]">리뷰</span>
        <span className="text-[20px] font-bold">{reviewCount}</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <span className="text-[16px]">팔로잉</span>
        <span className="text-[20px] font-bold">{followingCount}</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <span className="text-[16px]">팔로워</span>
        <span className="text-[20px] font-bold">{followerCount}</span>
      </button>
    </div>
  )
}
