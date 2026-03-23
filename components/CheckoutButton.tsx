'use client'

import { useState } from 'react'
import { Producto } from '@/lib/supabase'

interface CheckoutButtonProps {
  producto: Producto
}

export default function CheckoutButton({ producto }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: producto.id,
          quantity: 1,
        }),
      })

      const data = await response.json()

      if (data.init_point) {
        // Redirigir a Mercado Pago
        window.location.href = data.init_point
      } else {
        throw new Error('No se pudo crear la preferencia de pago')
      }
    } catch (error) {
      console.error('Error en checkout:', error)
      alert('Hubo un error al procesar el pago. Intenta nuevamente.')
      setLoading(false)
    }
  }

  const isDisabled = producto.stock === 0 || loading

  return (
    <button
      onClick={handleCheckout}
      disabled={isDisabled}
      className={`
        w-full py-5 px-8 rounded-lg font-bold text-lg
        transition-all duration-200
        ${
          isDisabled
            ? 'bg-surface-container dark:bg-primary-container text-on-surface-variant dark:text-on-primary-fixed-variant cursor-not-allowed'
            : 'bg-gradient-primary text-on-primary hover:opacity-90'
        }
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-3">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Procesando...
        </span>
      ) : producto.stock === 0 ? (
        'Sin Stock'
      ) : (
        '💳 Comprar con Mercado Pago'
      )}
    </button>
  )
}
