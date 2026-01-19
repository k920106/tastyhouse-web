import { api } from '@/lib/api'
import { ApiResponse } from '@/types/api/api'
import { EventRankDurationResponse } from './event.type'

const ENDPOINT = '/api/event'

export const eventRepository = {
  async getEventRankDuration() {
    return api.get<ApiResponse<EventRankDurationResponse>>(`${ENDPOINT}/v1/rank/duration`)
  },
}
