import { PAGE_PATHS } from '@/lib/paths'
import '@/styles/globals.css'
import { Nanum_Myeongjo } from 'next/font/google'

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nanum-myeongjo',
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={nanumMyeongjo.variable}>
      <head>
        <link rel="icon" href={PAGE_PATHS.FAVICON} sizes="any" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
