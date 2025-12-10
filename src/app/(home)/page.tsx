import { ApiClient } from '@/lib/api-client'
import { Banner } from '@/types/api/banner'
import { ApiResponse, PagedApiResponse } from '@/types/api/common'
import { BestPlace } from '@/types/api/place'
import { ChoicePlace, TodayDiscountProduct } from '@/types/api/product'
import { BestReview } from '@/types/api/review'
import ChoiceSection from './_components/ChoiceSection'

async function getBanners(): Promise<Banner[]> {
  try {
    const response = await ApiClient.get<PagedApiResponse<Banner>>('/banners/v1')

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
    const response = await ApiClient.get<PagedApiResponse<TodayDiscountProduct>>(
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

export function mockEditorChoice(): ChoicePlace[] {
  return [
    {
      id: 1,
      placeName: '리틀넥 청담',
      imageUrl: '/images/sample/place-image1.png',
      title: '서울 속 작은 뉴욕, 리틀넥 청담',
      content: '뉴욕 퀸즈의 작은 동네 이름처럼 밝고 포근한 공간에서 캐주얼한 메뉴들을 만나보세요.',
      products: [
        {
          id: 101,
          placeName: '리틀넥 청담',
          name: '리코타 샐러드',
          imageUrl: '/images/sample/food-image1.png',
          originalPrice: 18000,
          discountPrice: 15000,
          discountRate: 17,
        },
        {
          id: 102,
          placeName: '파스타 바움',
          name: '감바스 파스타',
          imageUrl: '/images/sample/food-image2.png',
          originalPrice: 16000,
          discountPrice: 13900,
          discountRate: 13,
        },
      ],
    },
    {
      id: 2,
      placeName: '파스타 바움',
      imageUrl: '/images/sample/place-image2.png',
      title: '따뜻한 감성 파스타 전문점',
      content: '신선한 재료를 바탕으로 깊은 풍미의 파스타를 제공하는 감성 가득한 매장입니다.',
      products: [
        {
          id: 102,
          placeName: '파스타 바움',
          name: '감바스 파스타',
          imageUrl: '/images/sample/food-image2.png',
          originalPrice: 16000,
          discountPrice: 13900,
          discountRate: 13,
        },
        {
          id: 103,
          placeName: '브런치 로드',
          name: '에그 베네딕트',
          imageUrl: '/images/sample/food-image3.png',
          originalPrice: 19000,
          discountPrice: 16500,
          discountRate: 13,
        },
      ],
    },
    {
      id: 3,
      placeName: '브런치 로드',
      imageUrl: '/images/sample/place-image3.png',
      title: '여유로운 하루를 위한 브런치',
      content: '따뜻한 커피와 함께 여유로운 아침을 만들어주는 다양한 브런치 메뉴를 제공합니다.',
      products: [
        {
          id: 103,
          placeName: '브런치 로드',
          name: '에그 베네딕트',
          imageUrl: '/images/sample/food-image3.png',
          originalPrice: 19000,
          discountPrice: 16500,
          discountRate: 13,
        },
        {
          id: 104,
          placeName: '브런치 로드4',
          name: '에그 베네딕트4',
          imageUrl: '/images/sample/food-image4.png',
          originalPrice: 29000,
          discountPrice: 26500,
          discountRate: 23,
        },
      ],
    },
  ]
}

async function getEditorChoices(): Promise<ChoicePlace[]> {
  try {
    // const response = await ApiClient.get<ApiResponse<ChoicePlace[]>>('/v1/teha-choice')

    // if (response.success && response.data) {
    //   return response.data
    // }
    return mockEditorChoice()
  } catch (error) {
    console.error('Failed to fetch editor choices:', error)
    return []
  }
}

export default async function HomePage() {
  // const banners = await getBanners()
  // const bestReviews = await getBestReviews()
  // const bestPlaces = await getBestPlaces()
  // const todayDiscounts = await getTodayDiscounts()
  const editorChoices = await getEditorChoices()

  return (
    <>
      {/* <BannerSection banners={banners} />
      <BestReviewSection reviews={bestReviews} />
      <BestPlaceSection places={bestPlaces} />
      <TodayDiscountSection discounts={todayDiscounts} /> */}
      <ChoiceSection choices={editorChoices} />
    </>
  )
}
