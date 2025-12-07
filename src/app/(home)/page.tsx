import { ApiClient } from '@/lib/api-client'
import { Banner } from '@/types/api/banner'
import { PagedApiResponse } from '@/types/api/common'
import { BestReview } from '@/types/api/review'
import BannerSection from './_components/BannerSection'
import BestReviewSection from './_components/BestReviewSection'

async function getBanners(): Promise<Banner[]> {
  try {
    const response = await ApiClient.get<PagedApiResponse<Banner>>('/banners/v1', {
      page: 0,
      size: 5,
    })

    if (response.success && response.data) {
      return response.data
    }

    return []
  } catch (error) {
    console.error('Failed to fetch banners:', error)
    return []
  }
}

async function getBestReviews(): Promise<BestReview[]> {
  try {
    const response = await ApiClient.get<PagedApiResponse<BestReview>>('/reviews/v1/best', {
      page: 0,
      size: 5,
    })

    if (response.success && response.data) {
      return response.data
    }

    return []
  } catch (error) {
    console.error('Failed to fetch best reviews:', error)
    return []
  }
}

export default async function HomePage() {
  const banners = await getBanners()
  const bestReviews = await getBestReviews()

  return (
    <>
      <BannerSection banners={banners} />
      <BestReviewSection reviews={bestReviews} />
      <section>베스트 플레이스</section>
      <section>오늘의 할인</section>
      <section>테하 초이스</section>
    </>
  )
}
