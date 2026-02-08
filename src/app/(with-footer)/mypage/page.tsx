import MyPageContent from '@/components/mypage/MyPageContent'

interface MyPageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function MyPage({ searchParams }: MyPageProps) {
  const params = await searchParams
  const initialTab = (params.tab || 'reviews') as 'reviews' | 'payments' | 'places'

  return <MyPageContent initialTab={initialTab} />
}
