import QuickReviewButton from '@/components/home/QuickReviewButton'
import Header from '@/components/layouts/Header'
import Image from 'next/image'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <Image src="/images/header-logo.png" alt="로고" width={83} height={43} priority />
      </Header>
      <main className="pb-[70px]">{children}</main>
      <div className="fixed bottom-18 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-[60]">
        <QuickReviewButton />
      </div>
    </>
  )
}
