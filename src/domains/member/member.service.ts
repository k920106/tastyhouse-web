import { memberRepository } from './member.repository'

export const memberService = {
  async getMemberMe() {
    return await memberRepository.getMemberMe()
  },
  async getMyContact() {
    return await memberRepository.getMyContact()
  },
  async getMyAvailableCoupons() {
    return await memberRepository.getMyAvailableCoupons()
  },
  async getMyUsablePoint() {
    return await memberRepository.getMyUsablePoint()
  },
}
