'use client'

import { RankInfoModal } from '@/components/modals/RankInfoModal' // RankInfoModal import
import { formatDate, formatRemainingTime, getTimeDifference } from '@/lib/date'
import { RankEventInfo, RankPeriod } from '@/types/api/rank'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdInfo } from 'react-icons/md'

interface RankHeaderContentProps {
  eventInfo: RankEventInfo
  initialTab: RankPeriod
}

export default function RankHeaderContent({ eventInfo, initialTab }: RankHeaderContentProps) {
  const router = useRouter()

  const [showRankInfoModal, setShowRankInfoModal] = useState(false)

  const timeDifference = getTimeDifference(eventInfo.endAt)
  const remainingTime = formatRemainingTime(timeDifference)

  const startDateFormatted = formatDate(eventInfo.startAt, 'YYYY.MM.DD')
  const endDateFormatted = formatDate(eventInfo.endAt, 'MM.DD')
  const dateRange = `${startDateFormatted} ~ ${endDateFormatted}`

  const handleTabChange = (value: string) => {
    const newType = value === 'monthly' ? 'monthly' : 'all'
    router.push(`/rank?type=${newType}`)
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <Tabs value={initialTab} onValueChange={handleTabChange}>
            <TabsList className="flex gap-3 p-0 bg-white">
              <TabsTrigger
                className="p-0 text-lg font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none cursor-pointer"
                value="all"
              >
                전체
              </TabsTrigger>
              <TabsTrigger
                className="p-0 text-lg font-bold text-[#333333]/50 data-[state=active]:text-black data-[state=active]:shadow-none cursor-pointer"
                value="monthly"
              >
                이번 달
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <MdInfo
            size="18"
            color="#dddddd"
            onClick={() => setShowRankInfoModal(true)}
            className="cursor-pointer"
          />
        </div>
        <p className="text-sm">남은 기간 : {remainingTime}</p>
      </div>
      <p className="text-sm text-[#aaaaaa] text-right">({dateRange})</p>
      <RankInfoModal open={showRankInfoModal} onOpenChange={setShowRankInfoModal} />
    </>
  )
}
