'use client'

import { FacilityDiv } from '@/components/places/FacilityItem'
import { Skeleton } from '@/components/ui/shadcn/skeleton'
import { PlaceInfoResponse } from '@/types/api/place-detail'
import Link from 'next/link'

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
  const { businessHours, breakTimes, closedDays, phoneNumber, amenities } = placeInfo

  return (
    <div className="pt-[30px]">
      <div className="pb-5 space-y-[15px] border-b border-[#eeeeee] box-border">
        {businessHours && businessHours.length > 0 && (
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
        {breakTimes && breakTimes.length > 0 && (
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
        {closedDays && closedDays.length > 0 && (
          <div className="flex justify-between">
            <h3 className="text-sm leading-[14px]">휴무일</h3>
            <div className="space-y-2">
              {closedDays.map((closedDay, index) => (
                <div key={index} className="flex gap-2">
                  <span className="text-sm leading-[14px]">{closedDay.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {phoneNumber && (
          <div className="flex justify-between">
            <h3 className="text-sm leading-[14px]">전화번호</h3>
            <Link href={`tel:${phoneNumber}`}>
              <p className="text-sm leading-[14px] underline">{phoneNumber}</p>
            </Link>
          </div>
        )}
      </div>
      {amenities && amenities.length > 0 && (
        <div className="pt-5">
          <h3 className="text-sm leading-[14px] mb-[15px]">편의시설</h3>
          <div className="grid grid-cols-4 gap-2.5">
            {amenities.map((amenity) => (
              <FacilityDiv key={amenity.code} amenity={amenity} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
