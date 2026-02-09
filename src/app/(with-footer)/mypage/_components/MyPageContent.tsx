import { memberService } from '@/domains/member/member.service'
import BookmarkList from './BookmarkList'
import MyPageHeader from './MyPageHeader'
import MyPageProfile from './MyPageProfile'
import MyPageTabs from './MyPageTabs'
import PaymentList from './PaymentList'

export type MyPageTabValue = 'reviews' | 'payments' | 'bookmarks'

interface MyPageContentProps {
  initialTab: MyPageTabValue
}

export default async function MyPageContent({ initialTab }: MyPageContentProps) {
  // 결제 목록
  const paymentsResponse = await memberService.getMyPayments(0, 10)
  const payments = paymentsResponse.data?.data || []
  const hasMorePayments = (paymentsResponse.data?.pagination?.totalElements ?? 0) > 10
  const paymentsContent = <PaymentList payments={payments} hasMorePayments={hasMorePayments} />

  // 즐겨찾기 목록
  const bookmarksResponse = await memberService.getMyBookmarks(0, 10)
  const bookmarks = bookmarksResponse.data?.data || []
  const hasMoreBookmarks = (bookmarksResponse.data?.pagination?.totalElements ?? 0) > 10
  const bookmarksContent = (
    <BookmarkList bookmarks={bookmarks} hasMoreBookmarks={hasMoreBookmarks} />
  )

  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MyPageHeader />
        <MyPageProfile />
      </div>
      <MyPageTabs
        initialTab={initialTab}
        paymentsContent={paymentsContent}
        bookmarksContent={bookmarksContent}
      />
    </div>
  )
}
