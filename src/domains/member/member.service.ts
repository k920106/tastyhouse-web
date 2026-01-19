import { memberRepository } from './member.repository'

export const memberService = {
  async getMemberMe() {
    return await memberRepository.getMemberMe()
  },
}
