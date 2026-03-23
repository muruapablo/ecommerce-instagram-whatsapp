import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ToastProvider } from '@/components/Toast'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CartProvider } from '@/contexts/CartContext'
import { store } from '@/config/store'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({ 
  weight: ['400', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: store.name,
    template: `%s | ${store.name}`,
  },
  description: store.description,
  keywords: ['ecommerce', 'tienda online', 'productos', store.name, 'whatsapp', 'instagram'],
  authors: [{ name: store.name }],
  creator: store.name,
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://tutienda.com',
    siteName: store.name,
    title: store.name,
    description: store.description,
    images: [
      {
        url: '/og-image.jpg', // Deberás crear esta imagen 1200x630px
        width: 1200,
        height: 630,
        alt: store.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: store.name,
    description: store.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${manrope.variable}`} suppressHydrationWarning>
      <body className="bg-surface dark:bg-primary font-body antialiased transition-colors duration-300">
        <ThemeProvider>
          <CartProvider>
            <ToastProvider>
            
            {/* MonoBoutique: Subtle floating layers for depth */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-surface-variant/30 dark:bg-primary-fixed/10 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-surface-container-low/50 dark:bg-primary-container/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
            </div>
            
              <Navbar />
              <main>{children}</main>
            </ToastProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
