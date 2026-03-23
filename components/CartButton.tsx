'use client'

import { useCart } from '@/contexts/CartContext'
import Link from 'next/link'

export default function CartButton() {
  const { totalItems } = useCart()

  return (
    <Link
      href="/carrito"
      className="group relative p-3 bg-surface-container dark:bg-primary-container rounded-lg hover:bg-gradient-primary hover:scale-110 transition-all duration-300"
      aria-label="Ver carrito"
    >
      {/* Cart Icon */}
      <svg
        className="w-5 h-5 text-on-surface dark:text-on-primary group-hover:text-on-primary transition-colors"
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
        <span className="absolute -top-2 -right-2 bg-secondary text-on-secondary text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-bounce">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  )
}
