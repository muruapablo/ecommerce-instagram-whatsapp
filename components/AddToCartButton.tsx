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
          <label className="font-bold text-charcoal-900 dark:text-sand-50">Cantidad:</label>
          <div className="flex items-center border-2 border-charcoal-900 dark:border-sand-200/30 rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 bg-sand-100 dark:bg-charcoal-700 hover:bg-sand-200 dark:hover:bg-charcoal-600 font-bold transition-colors"
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="px-6 py-2 bg-white dark:bg-charcoal-800 font-bold min-w-[60px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(producto.stock, quantity + 1))}
              className="px-4 py-2 bg-sand-100 dark:bg-charcoal-700 hover:bg-sand-200 dark:hover:bg-charcoal-600 font-bold transition-colors"
              disabled={quantity >= producto.stock}
            >
              +
            </button>
          </div>
          <span className="text-sm text-charcoal-600 dark:text-sand-400">
            (máx: {producto.stock})
          </span>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isDisabled || added}
        className={`
          w-full py-5 px-8 rounded-lg font-bold text-white text-lg
          border-2 border-charcoal-900 dark:border-sand-200/30
          transition-all duration-200
          ${
            isDisabled
              ? 'bg-charcoal-300 dark:bg-charcoal-700 cursor-not-allowed'
              : added
              ? 'bg-green-600 dark:bg-green-700'
              : 'bg-gradient-to-r from-[#4A4A4A] to-[#1A1A1A] dark:from-[#5A5A5A] dark:to-[#2A2A2A] hover:from-[#3A3A3A] hover:to-[#121212] dark:hover:from-[#4A4A4A] dark:hover:to-[#1A1A1A] shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] dark:shadow-[6px_6px_0px_0px_rgba(245,240,228,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[3px] hover:translate-y-[3px]'
          }
        `}
      >
        {isDisabled ? (
          '❌ Sin Stock'
        ) : added ? (
          <span className="flex items-center justify-center gap-2">
            ✓ Agregado al carrito
          </span>
        ) : (
          '🛒 Agregar al Carrito'
        )}
      </button>

      {/* Buy Now Button */}
      {showBuyNow && !isDisabled && (
        <button
          onClick={handleBuyNow}
          className="w-full py-4 px-8 rounded-lg font-bold text-charcoal-900 dark:text-sand-50 text-lg border-2 border-charcoal-900 dark:border-sand-200/30 bg-white dark:bg-charcoal-800 hover:bg-sand-100 dark:hover:bg-charcoal-700 transition-all duration-200"
        >
          ⚡ Comprar Ahora
        </button>
      )}
    </div>
  )
}
