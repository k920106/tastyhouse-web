import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center min-h-screen bg-white">
        <div className="w-full max-w-[500px]">{children}</div>
      </body>
    </html>
  )
}
