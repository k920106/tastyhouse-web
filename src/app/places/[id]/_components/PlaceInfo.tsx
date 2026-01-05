'use client'

import ErrorMessage from '@/components/ui/ErrorMessage'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { getPlaceInfo } from '@/services/place'
import { PlaceInfoResponse } from '@/types/api/place-detail'
import { useQuery } from '@tanstack/react-query'
import { BiCopy } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'

export function PlaceInfoSkeleton() {
  return (
    <div className="py-6 space-y-8">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

interface PlaceInfoProps {
  placeId: number
}

function PlaceInfoContent({ placeInfo }: { placeInfo: PlaceInfoResponse }) {
  const handleCopyAddress = () => {
    if (placeInfo.roadAddress) {
      navigator.clipboard.writeText(placeInfo.roadAddress)
    }
  }

  return (
    <div className="py-6 space-y-8">
      {placeInfo.ownerMessage && (
        <div>
          <div className="inline-block px-3 py-1.5 mb-3 text-[13px] text-white bg-main rounded-full">
            사장님 한마디
          </div>
          <p className="text-[15px] leading-[1.6]">{placeInfo.ownerMessage}</p>
        </div>
      )}
      {placeInfo.businessHours.length > 0 && (
        <div>
          <h3 className="mb-3 text-[15px]">운영시간</h3>
          <div className="space-y-2 text-[15px] text-[#666666]">
            {placeInfo.businessHours.map((hour, index) => (
              <div key={index} className="flex justify-between">
                <span>{hour.dayOfWeek}</span>
                <div className="flex flex-col items-end">
                  <span>
                    {hour.openTime}~{hour.closeTime}
                  </span>
                  {hour.breakStartTime && hour.breakEndTime && (
                    <span className="text-[13px] text-[#999999]">
                      브레이크타임 {hour.breakStartTime}~{hour.breakEndTime}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {placeInfo.closedDays && (
        <div>
          <h3 className="mb-3 text-[15px]">휴무일</h3>
          <p className="text-[15px] text-[#666666]">{placeInfo.closedDays}</p>
        </div>
      )}
      {placeInfo.phoneNumber && (
        <div>
          <h3 className="mb-3 text-[15px]">전화번호</h3>
          <p className="text-[15px] text-[#666666]">{placeInfo.phoneNumber}</p>
        </div>
      )}
      <div className="flex items-center gap-3 text-[13px]">
        <button className="flex items-center gap-1 text-main">
          <MdLocationOn size={16} />
          <span>지도</span>
        </button>
        <button onClick={handleCopyAddress} className="flex items-center gap-1 text-main">
          <BiCopy size={16} />
          <span>복사</span>
        </button>
      </div>
    </div>
  )
}

export default function PlaceInfo({ placeId }: PlaceInfoProps) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['place', placeId, 'info'],
    queryFn: () => getPlaceInfo(placeId),
  })

  if (isLoading) {
    return <PlaceInfoSkeleton />
  }

  if (isError) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스 정보')}
        className="py-10 bg-white"
      />
    )
  }

  return <PlaceInfoContent placeInfo={data.data} />
}
