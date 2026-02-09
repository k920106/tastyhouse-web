import { api } from '@/lib/api'
import { ApiResponse, PaginationParams } from '@/types/common'
import {
  MemberCouponListItemResponse,
  MemberInfo,
  MyBookmarkedPlaceListItemResponse,
  MyPaymentListItemResponse,
  MyReviewListItemResponse,
  MyReviewStatsResponse,
  UsablePointResponse,
} from './member.type'

const ENDPOINT = '/api/members'

export const memberRepository = {
  // 내 프로필 조회
  async getMemberMe() {
    return api.get<ApiResponse<MemberInfo>>(`${ENDPOINT}/v1/me`)
  },
  // 내 리뷰 통계 조회
  async getMyReviewStats() {
    return api.get<ApiResponse<MyReviewStatsResponse>>(`${ENDPOINT}/v1/me/review-stats`)
  },
  // 사용 가능한 쿠폰 목록 조회
  async getMyAvailableCoupons() {
    return api.get<ApiResponse<MemberCouponListItemResponse[]>>(
      `${ENDPOINT}/v1/me/coupons/available`,
    )
  },
  async getMyUsablePoint() {
    return api.get<ApiResponse<UsablePointResponse>>(`${ENDPOINT}/v1/me/point/usable`)
  },
  async getMyReviews(params: PaginationParams) {
    return api.get<ApiResponse<MyReviewListItemResponse[]>>(`${ENDPOINT}/v1/me/reviews`, {
      params,
    })
  },
  async getMyPayments(params: PaginationParams) {
    return api.get<ApiResponse<MyPaymentListItemResponse[]>>(`${ENDPOINT}/v1/me/payments`, {
      params,
    })
  },
  async getMyBookmarks(params: PaginationParams) {
    return api.get<ApiResponse<MyBookmarkedPlaceListItemResponse[]>>(
      `${ENDPOINT}/v1/me/bookmarks`,
      {
        params,
      },
    )
  },
}
