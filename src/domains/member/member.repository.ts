import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import {
  MemberContactResponse,
  MemberCouponListItemResponse,
  MemberInfo,
  UsablePointResponse,
} from './member.type'

const ENDPOINT = '/api/members'

export const memberRepository = {
  async getMemberMe() {
    return api.get<ApiResponse<MemberInfo>>(`${ENDPOINT}/v1/me`)
  },
  // async getMemberMe() {
  //   return api.get<ApiResponse<MemberInfo>>(`${ENDPOINT}/v1/me`)
  // },
  async getMyContact() {
    return api.get<ApiResponse<MemberContactResponse>>(`${ENDPOINT}/v1/me/contact`)
  },
  async getMyAvailableCoupons() {
    return api.get<ApiResponse<MemberCouponListItemResponse[]>>(
      `${ENDPOINT}/v1/me/coupons/available`,
    )
  },
  async getMyUsablePoint() {
    return api.get<ApiResponse<UsablePointResponse>>(`${ENDPOINT}/v1/me/point/usable`)
  },
}
