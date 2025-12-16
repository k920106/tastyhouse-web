export interface Event {
  id: number
  title: string
  imageUrl: string
  startDate: string
  endDate: string
  status: 'ongoing' | 'ended' | 'upcoming'
  type: 'ongoing' | 'ended' | 'winner'
  announcementDate?: string
  content?: string
  winners?: Winner[]
}

export interface Winner {
  name: string
  phoneNumber: string
}

export interface EventListResponse {
  events: Event[]
  totalCount: number
}

export interface EventDetailResponse {
  event: Event
}
