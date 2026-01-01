import { api } from '@/lib/api'
import { API_ENDPOINTS } from '@/lib/endpoints'
import { ApiResponse } from '@/types/api/api'
import { PlaceBookmarkResponse } from '@/types/api/place-detail'
import BookmarkButtonClient from './BookmarkButtonClient'

interface BookmarkButtonProps {
  placeId: number
}

export default async function BookmarkButton({ placeId }: BookmarkButtonProps) {
  const { data } = await api.get<ApiResponse<PlaceBookmarkResponse>>(
    API_ENDPOINTS.PLACES_BOOKMARK(placeId),
  )

  const isBookmarked = data?.data?.bookmarked ?? false

  return <BookmarkButtonClient placeId={placeId} initialIsBookmarked={isBookmarked} />
}
