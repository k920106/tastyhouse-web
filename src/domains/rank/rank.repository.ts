import { api } from '@/lib/api'
import { ApiResponse } from '@/types/common'
import {
  RankMemberListItemResponse,
  RankMemberMeResponse,
  RankMemberQuery,
  RankMembersMeQuery,
} from './rank.type'

const ENDPOINT = '/api/ranks'

export const rankRepository = {
  async getRankMembers(params: RankMemberQuery) {
    return api.get<ApiResponse<RankMemberListItemResponse[]>>(`${ENDPOINT}/v1/members`, { params })
  },
  async getRankMembersMe(params: RankMembersMeQuery) {
    return api.get<ApiResponse<RankMemberMeResponse>>(`${ENDPOINT}/v1/members/me`, { params })
  },
}
