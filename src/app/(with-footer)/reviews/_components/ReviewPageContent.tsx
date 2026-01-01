'use client'

import SectionStack from '@/components/ui/SectionStack'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'
import type { ReviewType } from '@/types/api/review'
import { useState } from 'react'
import LatestReviewList from './LatestReviewList'

type TabValue = 'all' | 'following'

const reviewTypeMap: Record<TabValue, ReviewType> = {
  all: 'ALL',
  following: 'FOLLOWING',
}

export default function ReviewPageContent() {
  const [activeTab, setActiveTab] = useState<TabValue>('all')

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabValue)
    // 탭 변경 시 스크롤을 최상단으로 이동
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="gap-0">
      <TabsList className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0">
        <TabsTrigger
          value="all"
          className="flex-1 h-full rounded-none border-0 text-sm leading-[14px] text-[#333333]/40 shadow-none data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main border-b border-[#eeeeee]"
        >
          전체
        </TabsTrigger>
        <TabsTrigger
          value="following"
          className="flex-1 h-full rounded-none border-0 text-sm leading-[14px] text-[#333333]/40 shadow-none data-[state=active]:text-main data-[state=active]:font-bold data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-main border-b border-[#eeeeee]"
        >
          팔로잉
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="mt-0">
        <SectionStack>
          <LatestReviewList reviewType={reviewTypeMap.all} />
        </SectionStack>
      </TabsContent>
      <TabsContent value="following" className="mt-0">
        <SectionStack>
          <LatestReviewList reviewType={reviewTypeMap.following} />
        </SectionStack>
      </TabsContent>
    </Tabs>
  )
}
