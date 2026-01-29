import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Robin Wood',
  description: 'Intelligent compression for the AI era',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Toaster position="top-right" /> {/* <--- ADICIONE ISSO AQUI */}
      </body>
    </html>
  )
}
