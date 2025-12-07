import '@/styles/globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center min-h-screen bg-white">
        <div className="relative w-full max-w-[500px] overflow-hidden">{children}</div>
      </body>
    </html>
  )
}
