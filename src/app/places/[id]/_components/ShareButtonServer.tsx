import ShareButton from './ShareButton'

interface ShareButtonServerProps {
  placeId: number
}

export default async function ShareButtonServer({ placeId }: ShareButtonServerProps) {
  //   const { error, data } = await api.get<ApiResponse<PlaceSummaryResponse>>(
  //     API_ENDPOINTS.PLACES_SUMMARY(placeId),
  //   )
  //   if (error) {
  //     return <div>-</div>
  //   }
  //   if (!data || !data.success || !data.data) {
  //     return <div>-</div>
  //   }
  //   const { name } = data.data
  //   return <ShareButton placeId={placeId} placeName={name} />
  return <ShareButton placeId={placeId} placeName="test" />
}
