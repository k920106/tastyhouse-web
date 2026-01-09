'use client'

import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceInfoResponse } from '@/types/api/place-detail'

export function PlaceInfoDetailSkeleton() {
  return (
    <div className="py-6 space-y-8">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-20 w-full" />
    </div>
  )
}

interface PlaceInfoDetailProps {
  placeInfo: PlaceInfoResponse
}

export default function PlaceInfoDetail({ placeInfo }: PlaceInfoDetailProps) {
  const { businessHours, breakTimes, closedDays, phoneNumber } = placeInfo
  console.log('breakTimes', breakTimes)
  console.log('businessHours', businessHours)
  console.log('closedDays', closedDays)
  console.log('phoneNumber', phoneNumber)

  return (
    <div className="pt-[30px] pb-5">
      <div className="space-y-[15px]">
        {businessHours.length > 0 && (
          <div className="flex justify-between">
            <h3 className="text-sm leading-[14px]">운영시간</h3>
            <div className="space-y-2">
              {businessHours.map((hour, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-sm leading-[14px]">{hour.dayTypeDescription}</span>
                  <span className="text-sm leading-[14px]">
                    {hour.openTime} - {hour.closeTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {breakTimes.length > 0 && (
          <div className="flex justify-between">
            <h3 className="text-sm leading-[14px]">브레이크타임</h3>
            <div className="space-y-2">
              {breakTimes.map((breakTime, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-sm leading-[14px]">{breakTime.dayTypeDescription}</span>
                  <span className="text-sm leading-[14px]">
                    {breakTime.startTime} - {breakTime.endTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        {closedDays && (
          <div>
            <h3 className="mb-3 text-[15px]">휴무일</h3>
            <p className="text-[15px] text-[#666666]">{closedDays}</p>
          </div>
        )}
        {phoneNumber && (
          <div>
            <h3 className="mb-3 text-[15px]">전화번호</h3>
            <p className="text-[15px] text-[#666666]">{phoneNumber}</p>
          </div>
        )}
      </div>
    </div>
  )
}
