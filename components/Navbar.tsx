'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { store } from '@/config/store'
import CartButton from './CartButton'

// Dynamically import ThemeToggle with no SSR to avoid context issues during build
const ThemeToggle = dynamic(() => import('./ThemeToggle'), {
  ssr: false,
  loading: () => (
    <div className="w-10 h-10 bg-surface-container rounded-md animate-pulse" />
  ),
})

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-gradient-primary text-on-primary px-4 py-2 rounded-md font-headline font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Saltar al contenido
      </a>

      {/* MonoBoutique: Borderless navigation with tonal layering */}
      <nav className="bg-surface-container-lowest/80 dark:bg-primary/90 backdrop-blur-boutique sticky top-0 z-50 shadow-ambient transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5 gap-4">
            
            {/* Logo / Store Name - Market Style */}
            <Link href="/" className="group flex items-center gap-2 min-w-0">
              {/* Market-style logo container */}
              <div className="relative">
                {/* Subtle gradient accent (no borders) */}
                <div className="absolute -inset-4 bg-surface-variant/10 dark:bg-primary-fixed/5 opacity-0 group-hover:opacity-100 rounded-md transition-all duration-500 blur-sm" />
                
                {/* Store name with editorial typography */}
                <div className="relative flex flex-col">
                  <span className="font-headline font-extrabold text-2xl sm:text-3xl lg:text-4xl text-on-surface dark:text-on-primary tracking-tighter-print leading-none transition-colors">
                    {store.name.split(' ')[0]}
                  </span>
                  {store.name.split(' ')[1] && (
                    <span className="font-headline font-semibold text-base sm:text-lg lg:text-xl text-on-surface-variant dark:text-on-primary-fixed-variant tracking-wide leading-none mt-0.5 transition-colors">
                      {store.name.split(' ').slice(1).join(' ')}
                    </span>
                  )}
                  {/* Subtle underline accent */}
                  <div className="h-[2px] w-0 group-hover:w-full bg-gradient-primary transition-all duration-500 mt-1" />
                </div>
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Main action buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                
                {/* Search Button - MonoBoutique: no borders, tonal layers */}
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="group relative p-2.5 sm:p-3 bg-surface-container dark:bg-primary-container rounded-md hover:bg-surface-container-high dark:hover:bg-primary-fixed transition-all duration-300 shadow-ambient"
                  aria-label="Buscar productos"
                  aria-expanded={searchOpen}
                >
                  <svg
                    className="w-5 h-5 text-on-surface dark:text-on-primary transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Instagram */}
                {store.instagram && (
                  <a
                    href={`https://instagram.com/${store.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 sm:p-3 bg-surface-container dark:bg-primary-container rounded-md hover:bg-surface-container-high dark:hover:bg-primary-fixed transition-all duration-300 shadow-ambient"
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-5 h-5 text-on-surface dark:text-on-primary transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                )}

                {/* WhatsApp - MonoBoutique: Tonal layer with green icon */}
                {store.whatsapp && (
                  <a
                    href={`https://wa.me/${store.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-2.5 sm:p-3 bg-surface-container dark:bg-primary-container rounded-md hover:bg-surface-container-high dark:hover:bg-primary-fixed transition-all duration-300 shadow-ambient"
                    aria-label="WhatsApp"
                  >
                    <svg
                      className="w-5 h-5 text-secondary transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </a>
                )}

                {/* Cart Button */}
                <CartButton />
              </div>

              {/* Subtle divider (background shift, not solid line) */}
              <div className="hidden sm:block w-px h-8 bg-surface-variant/30 dark:bg-primary-fixed/20" />

              {/* Theme Toggle */}
              <div className="scale-90 opacity-90 hover:opacity-100 transition-opacity">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Search Bar (Expandable) - MonoBoutique: Ghost border */}
          {searchOpen && (
            <div className="pb-5 animate-fade-in">
              <form onSubmit={handleSearch} className="relative max-w-md">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full px-4 py-3 pl-12 bg-surface-container-highest dark:bg-primary-container rounded-md font-body text-on-surface dark:text-on-primary placeholder:text-on-surface-variant dark:placeholder:text-on-primary-fixed-variant focus:outline-none focus:ring-2 focus:ring-primary/20 dark:focus:ring-outline-variant/50 border border-outline-variant/20 dark:border-outline-variant/10 transition-all"
                  autoFocus
                  aria-label="Campo de búsqueda"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant dark:text-on-primary-fixed-variant"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </form>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}
