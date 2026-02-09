import { memberRepository } from './member.repository'

export const memberService = {
  async getMemberMe() {
    return await memberRepository.getMemberMe()
  },
  async getMyAvailableCoupons() {
    return await memberRepository.getMyAvailableCoupons()
  },
  async getMyUsablePoint() {
    return await memberRepository.getMyUsablePoint()
  },
  async getMyReviews(page: number = 0, size: number = 9) {
    return await memberRepository.getMyReviews({ page, size })
  },
  async getMyPayments(page: number = 0, size: number = 10) {
    return await memberRepository.getMyPayments({ page, size })
  },
  async getMyBookmarks(page: number = 0, size: number = 10) {
    return await memberRepository.getMyBookmarks({ page, size })
  },
}
