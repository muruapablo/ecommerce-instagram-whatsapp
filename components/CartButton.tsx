'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link
      href="/carrito"
      className="group relative p-3 bg-white dark:bg-charcoal-800 border-2 border-charcoal-900 dark:border-sand-200/30 rounded-lg hover:bg-gradient-to-br hover:from-[#D74B4B] hover:to-[#8B3A3A] dark:hover:from-[#8B3A3A] dark:hover:to-[#6B2E2E] hover:border-transparent hover:scale-110 transition-all duration-300 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,240,228,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(245,240,228,0.2)]"
      aria-label="Ver carrito"
    >
      {/* Cart Icon */}
      <svg
        className="w-5 h-5 text-charcoal-900 dark:text-sand-200 group-hover:text-white transition-colors"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>

      {/* Badge with item count */}
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#D74B4B] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white dark:border-charcoal-900 shadow-lg animate-bounce">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  )
}
