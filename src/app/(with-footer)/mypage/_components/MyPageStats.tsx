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
    <div className="flex items-center justify-center gap-10 py-5 border-b border-[#eeeeee]">
      <button className="flex items-center gap-1">
        <span className="text-xs leading-[12px]">리뷰</span>
        <span className="text-xs leading-[12px] font-bold">{reviewCount}</span>
      </button>
      <button className="flex items-center gap-1">
        <span className="text-xs leading-[12px]">팔로잉</span>
        <span className="text-xs leading-[12px] font-bold">{followingCount}</span>
      </button>
      <button className="flex items-center gap-1">
        <span className="text-xs leading-[12px]">팔로워</span>
        <span className="text-xs leading-[12px] font-bold">{followerCount}</span>
      </button>
    </div>
  )
}
