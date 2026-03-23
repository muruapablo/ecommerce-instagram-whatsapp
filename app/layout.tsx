import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
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

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
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
    <html lang="es" className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <body className="bg-sand-50 dark:bg-[#1A1625] min-h-screen font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          <CartProvider>
            <ToastProvider>
            <div className="grain-overlay" />
            
            {/* Animated gradient orbs (background decoration) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#D74B4B]/20 to-[#8B3A3A]/10 opacity-30 dark:opacity-15 rounded-full blur-3xl animate-float" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-br from-[#6B2E2E]/20 to-[#3D2424]/10 opacity-30 dark:opacity-15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#8B3A3A]/15 to-[#3D2424]/5 opacity-20 dark:opacity-10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}} />
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
