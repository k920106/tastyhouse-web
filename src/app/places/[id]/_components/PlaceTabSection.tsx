import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs'

export default function PlaceTabSection() {
  return (
    <Tabs defaultValue="info" className="w-full">
      <div className="sticky top-[60px] z-40 bg-white border-b border-[#eeeeee]">
        <TabsList className="w-full h-auto p-0 bg-transparent rounded-none">
          <TabsTrigger
            value="info"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
          >
            정보
          </TabsTrigger>
          <TabsTrigger
            value="menu"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
          >
            메뉴
          </TabsTrigger>
          <TabsTrigger
            value="photo"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
          >
            포토
          </TabsTrigger>
          {/* <TabsTrigger
            value="review"
            className="flex-1 py-4 text-[15px] data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black text-[#999999] border-b-2 border-transparent rounded-none"
          >
            리뷰 (
            {reviewStatistics.totalReviewCount > 99 ? '99+' : reviewStatistics.totalReviewCount})
          </TabsTrigger> */}
        </TabsList>
      </div>

      <div className="px-4">
        <TabsContent value="info" className="mt-0">
          {/* <PlaceInfo placeInfo={placeInfo} /> */}
        </TabsContent>
        <TabsContent value="menu" className="mt-0">
          {/* <PlaceMenus menus={menus} /> */}
        </TabsContent>
        <TabsContent value="photo" className="mt-0">
          {/* <PlacePhotos photos={photos} /> */}
        </TabsContent>
        {/* <TabsContent value="review" className="mt-0">
          <PlaceReviews reviews={reviews} statistics={reviewStatistics} />
        </TabsContent> */}
      </div>
    </Tabs>
  )
}
