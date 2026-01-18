import type { Metadata } from 'next'
import './globals.css'
import { ConsoleWelcome } from '@/components/ConsoleWelcome'

export const metadata: Metadata = {
  title: 'Robin Wood',
  description: 'Robin Wood Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <ConsoleWelcome />
        {children}
      </body>
    </html>
  )
}
