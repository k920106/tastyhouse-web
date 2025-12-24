import Header from '@/components/layouts/Header'
import Image from 'next/image'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header>
        <div className="relative w-[83px] h-[43px]">
          <Image
            src="/images/header-logo.png"
            alt="로고"
            fill
            sizes="83px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </Header>
      <main className="pb-[70px]">{children}</main>
    </>
  )
}
