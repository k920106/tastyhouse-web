export type Event = {
  id: number
  title: string
  imageUrl: string
  startDate: string
  endDate: string
  status: 'ongoing' | 'ended' | 'upcoming'
  type: 'ongoing' | 'ended' | 'winner'
  announcementDate?: string
  content?: string
  winners?: EventWinner[]
}

export type EventWinner = {
  name: string
  phoneNumber: string
}

export type EventPrizeResponse = {
  id: number
  prizeRank: number
  name: string
  brand: string
  imageUrl: string
}

export type EventRankDurationResponse = {
  startAt: Date
  endAt: Date
}
