import { eventRepository } from './event.repository'

export const eventService = {
  async getRankEventDuration() {
    return eventRepository.getEventRankDuration()
  },
  async getRankEventPrizes() {
    return eventRepository.getEventRankPrizes()
  },
}
