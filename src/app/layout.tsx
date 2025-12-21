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
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex justify-center min-h-screen bg-white">
        <div id="app-container" className="relative w-full max-w-[500px] overflow-hidden border border-[#eeeeee] box-border">
          {children}
        </div>
      </body>
    </html>
  )
}
