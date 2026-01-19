import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/api'
import { MemberInfo } from './member.type'

const ENDPOINT = '/api/members'

export const memberRepository = {
  async getMemberMe() {
    return api.get<ApiResponse<MemberInfo>>(`${ENDPOINT}/v1/me`)
  },
}
