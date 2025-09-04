import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tanga Ibuki - AI Chat Assistant',
  description: 'Chat dengan Ibuki, AI assistant yang ramah dan membantu',
  keywords: ['AI', 'chat', 'assistant', 'Ibuki', 'Tanga'],
  authors: [{ name: 'Tanga Ibuki' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-black via-[#0b0b0b] to-[#111111]">
          {children}
        </div>
      </body>
    </html>
  )
}
