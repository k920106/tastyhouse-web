import { ApiClient } from '@/lib/api-client'
import { Banner } from '@/types/api/banner'
import { ApiResponse } from '@/types/api/common'
import { BestPlace } from '@/types/api/place'
import { ChoicePlace, TodayDiscountProduct } from '@/types/api/product'
import { BestReview } from '@/types/api/review'
import BannerSection from './_components/BannerSection'
import BestPlaceSection from './_components/BestPlaceSection'
import BestReviewSection from './_components/BestReviewSection'
import ChoiceSection from './_components/ChoiceSection'
import TodayDiscountSection from './_components/TodayDiscountSection'

async function getBanners(): Promise<Banner[]> {
  try {
    const response = await ApiClient.get<ApiResponse<Banner[]>>('/banners/v1')

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
    const response = await ApiClient.get<ApiResponse<BestReview[]>>('/reviews/v1/best', {
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

async function getBestPlaces(): Promise<BestPlace[]> {
  try {
    const response = await ApiClient.get<ApiResponse<BestPlace[]>>('/places/v1/best', {
      page: 0,
      size: 4,
    })

    if (response.success && response.data) {
      return response.data
    }

    return []
  } catch (error) {
    console.error('Failed to fetch best places:', error)
    return []
  }
}

async function getTodayDiscounts(): Promise<TodayDiscountProduct[]> {
  try {
    const response = await ApiClient.get<ApiResponse<TodayDiscountProduct[]>>(
      '/products/v1/today-discounts',
      {
        page: 0,
        size: 4,
      },
    )

    if (response.success && response.data) {
      return response.data
    }

    return []
  } catch (error) {
    console.error('Failed to fetch today discounts:', error)
    return []
  }
}

export async function mockEditorChoice(): Promise<ChoicePlace[]> {
  try {
    const response = await ApiClient.get<ApiResponse<ChoicePlace[]>>('/places/v1/editor-choice', {
      page: 0,
      size: 4,
    })

    if (response.success && response.data) {
      return response.data
    }

    return []
  } catch (error) {
    console.error('Failed to fetch today discounts:', error)
    return []
  }
}

async function getEditorChoices(): Promise<ChoicePlace[]> {
  try {
    return mockEditorChoice()
  } catch (error) {
    console.error('Failed to fetch editor choices:', error)
    return []
  }
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
    </>
  )
}
