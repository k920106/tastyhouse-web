import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface ReviewListProps {
  reviews: ReviewListItem[]
}

export default function ReviewList(reviews: ReviewListItem[]) {
  return dummyReviews.length > 0 ? (
    <>
      <div className="py-[1px]">
        <div className="grid grid-cols-3 gap-[1.5px]">
          {dummyReviews.map((review) => (
            <Link
              key={review.id}
              href={PAGE_PATHS.REVIEW_DETAIL(review.id)}
              className="relative aspect-square"
            >
              <Image
                src={review.imagePath}
                alt="리뷰 이미지"
                fill
                sizes="33vw"
                className="object-cover"
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center py-5">
          <ViewMoreButton href={PAGE_PATHS.MY_REVIEWS} label="더 보러가기" />
        </div>
      </div>
      <div className="h-[70px]"></div>
    </>
  ) : (
    <div className="flex flex-col items-center justify-center h-full pb-[70px]">
      <div className="relative w-[35px] h-[40px]">
        <Image src="/images/mypage/logo-gray.png" alt="로고" width={35} height={40} />
      </div>
      <div className="mt-[15px]">
        <p className="text-sm leading-[14px] text-[#aaaaaa]">등록된 리뷰가 없습니다.</p>
      </div>
    </div>
  )
}
