import { Nanum_Myeongjo } from 'next/font/google'
import '@/styles/globals.css'

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
      <body className="flex justify-center min-h-screen bg-white">
        <div className="relative w-full max-w-[500px] overflow-hidden">{children}</div>
      </body>
    </html>
  )
}
