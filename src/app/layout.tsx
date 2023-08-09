import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import NextAuthSessionProvider from '@/components/providers/NextAuthSessionProvider'

export const metadata: Metadata = {
  title: 'Short URL',
  description: 'Tired of sharing long URLS? Use Short URL to create tiny URLs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <NextAuthSessionProvider>
            <Header />
            <main className="flex flex-col p-5">{children}</main>
          </NextAuthSessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
