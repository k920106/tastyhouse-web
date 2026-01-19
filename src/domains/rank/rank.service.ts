import { rankRepository } from './rank.repository'
import { RankMemberQuery, RankMembersMeQuery } from './rank.type'

export const rankService = {
  async getRankMembers(params: RankMemberQuery) {
    return rankRepository.getRankMembers(params)
  },
  async getRankMembersMe(params: RankMembersMeQuery) {
    return rankRepository.getRankMembersMe(params)
  },
}
