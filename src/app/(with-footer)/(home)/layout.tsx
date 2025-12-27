import Header from '@/components/layouts/Header'
import Image from 'next/image'

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={83}>
        <div className="relative w-[93px] h-[43px]">
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
      <div className="pb-[40px]">{children}</div>
    </>
  )
}
