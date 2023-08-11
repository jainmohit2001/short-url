import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import NextAuthSessionProvider from '@/components/providers/NextAuthSessionProvider'
import NotificationProvider from '@/components/providers/NotificationProvider'

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
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <ThemeRegistry>
          <NextAuthSessionProvider>
            <Header />
            <NotificationProvider>
              <main className="flex flex-1 flex-col p-5">{children}</main>
            </NotificationProvider>
          </NextAuthSessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
