'use client'

import { useState } from 'react'
import { Producto } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'

interface AddToCartButtonProps {
  producto: Producto
  showBuyNow?: boolean
}

export default function AddToCartButton({ producto, showBuyNow = false }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const handleAddToCart = () => {
    addItem(producto, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addItem(producto, quantity)
    router.push('/carrito')
  }

  const isDisabled = producto.stock === 0

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      {producto.stock > 0 && (
        <div className="flex items-center gap-4">
          <label className="font-headline font-semibold text-on-surface dark:text-on-primary text-sm transition-colors">Cantidad:</label>
          <div className="flex items-center bg-surface-container dark:bg-primary-container rounded-md overflow-hidden transition-colors">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2.5 bg-surface-container-high dark:bg-primary-fixed hover:bg-surface-container-highest dark:hover:bg-primary-fixed-dim font-headline font-bold text-on-surface dark:text-on-primary transition-colors"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="px-6 py-2.5 bg-surface-container-lowest dark:bg-primary-container font-headline font-bold text-on-surface dark:text-on-primary min-w-[60px] text-center transition-colors">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(producto.stock, quantity + 1))}
              className="px-4 py-2.5 bg-surface-container-high dark:bg-primary-fixed hover:bg-surface-container-highest dark:hover:bg-primary-fixed-dim font-headline font-bold text-on-surface dark:text-on-primary transition-colors"
              disabled={quantity >= producto.stock}
            >
              +
            </button>
          </div>
          <span className="text-sm font-body text-on-surface-variant dark:text-on-primary-fixed-variant transition-colors">
            (máx: {producto.stock})
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isDisabled || added}
        className={`
          w-full py-4 px-8 rounded-md font-headline font-bold text-base
          transition-all duration-300
          ${
            isDisabled
              ? 'bg-surface-container-high dark:bg-primary-container text-on-surface-variant dark:text-on-primary-fixed-variant cursor-not-allowed'
              : added
              ? 'bg-secondary text-on-secondary shadow-[0_4px_14px_rgba(0,109,47,0.25)]'
              : 'bg-gradient-primary text-on-primary shadow-ambient hover:shadow-ambient-lg hover:scale-[1.01] active:scale-[0.99]'
          }
        `}
      >
        {isDisabled ? (
          'Sin Stock'
        ) : added ? (
          <span className="flex items-center justify-center gap-2">
            ✓ Agregado al carrito
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Agregar al Carrito
          </span>
        )}
      </button>

      {/* Buy Now Button */}
      {showBuyNow && !isDisabled && (
        <button
          onClick={handleBuyNow}
          className="w-full py-3.5 px-8 rounded-md font-headline font-semibold text-base text-on-surface dark:text-on-primary bg-surface-container dark:bg-primary-container hover:bg-surface-container-high dark:hover:bg-primary-fixed transition-all duration-300 shadow-ambient"
        >
          Comprar Ahora
        </button>
      )}
    </div>
  )
}
