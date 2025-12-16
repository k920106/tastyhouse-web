import QuickReviewButton from '@/components/home/QuickReviewButton'
import { api } from '@/lib/api'
import { Banner } from '@/types/api/banner'
import { ApiResponse } from '@/types/api/common'
import { BestPlace, ChoicePlace } from '@/types/api/place'
import { TodayDiscountProduct } from '@/types/api/product'
import { BestReview } from '@/types/api/review'
import BannerSection from './_components/BannerSection'
import BestPlaceSection from './_components/BestPlaceSection'
import BestReviewSection from './_components/BestReviewSection'
import ChoiceSection from './_components/ChoiceSection'
import TodayDiscountSection from './_components/TodayDiscountSection'

async function getBanners(): Promise<Banner[]> {
  const { data, error } = await api.get<ApiResponse<Banner[]>>('/banners/v1')

  if (error) {
    console.error('Failed to fetch banners:', error)
    return []
  }

  if (data?.data) {
    return data.data
  }

  return []
}

async function getBestReviews(): Promise<BestReview[]> {
  const { data, error } = await api.get<ApiResponse<BestReview[]>>('/reviews/v1/best', {
    params: {
      page: 0,
      size: 5,
    },
  })

  if (error) {
    console.error('Failed to fetch best reviews:', error)
    return []
  }

  if (data?.data) {
    return data.data
  }

  return []
}

async function getBestPlaces(): Promise<BestPlace[]> {
  const { data, error } = await api.get<ApiResponse<BestPlace[]>>('/places/v1/best', {
    params: {
      page: 0,
      size: 4,
    },
  })

  if (error) {
    console.error('Failed to fetch best places:', error)
    return []
  }

  if (data?.data) {
    return data.data
  }

  return []
}

async function getTodayDiscounts(): Promise<TodayDiscountProduct[]> {
  const { data, error } = await api.get<ApiResponse<TodayDiscountProduct[]>>(
    '/products/v1/today-discounts',
    {
      params: {
        page: 0,
        size: 4,
      },
    },
  )

  if (error) {
    console.error('Failed to fetch today discounts:', error)
    return []
  }

  if (data?.data) {
    return data.data
  }

  return []
}

async function getEditorChoices(): Promise<ChoicePlace[]> {
  const { data, error } = await api.get<ApiResponse<ChoicePlace[]>>('/places/v1/editor-choice', {
    params: {
      page: 0,
      size: 4,
    },
  })

  if (error) {
    console.error('Failed to fetch editor choices:', error)
    return []
  }

  if (data?.data) {
    return data.data
  }

  return []
}

export default async function HomePage() {
  const banners = await getBanners()
  const bestReviews = await getBestReviews()
  const bestPlaces = await getBestPlaces()
  const todayDiscounts = await getTodayDiscounts()
  const editorChoices = await getEditorChoices()

  return (
    <>
      <BannerSection banners={banners} />
      <BestReviewSection reviews={bestReviews} />
      <BestPlaceSection places={bestPlaces} />
      <TodayDiscountSection products={todayDiscounts} />
      <ChoiceSection choices={editorChoices} />
      <div className="fixed bottom-18 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-[60]">
        <QuickReviewButton />
      </div>
    </>
  )
}
