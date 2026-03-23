'use client'

import { useCart } from '@/contexts/CartContext'
import { store } from '@/config/store'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    if (items.length === 0) return

    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.precio,
            title: item.nombre,
          })),
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-sand-50 dark:bg-charcoal-900 transition-colors duration-300 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-charcoal-900 dark:text-sand-50 mb-8">
            🛒 Carrito de Compras
          </h1>
          
          <div className="bg-white dark:bg-charcoal-800 rounded-2xl border-2 border-charcoal-900 dark:border-sand-200/30 p-12 text-center">
            <div className="mb-6">
              <svg
                className="w-32 h-32 mx-auto text-charcoal-300 dark:text-charcoal-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-charcoal-900 dark:text-sand-50 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-charcoal-600 dark:text-sand-400 mb-6">
              Agrega productos para comenzar a comprar
            </p>
            <Link
              href="/"
              className="inline-block bg-gradient-to-r from-[#D74B4B] to-[#8B3A3A] dark:from-[#8B3A3A] dark:to-[#6B2E2E] text-white font-bold px-8 py-4 rounded-lg hover:from-[#8B3A3A] hover:to-[#3D2424] transition-all duration-200 border-2 border-charcoal-900 dark:border-sand-200/30 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(139,58,58,0.5)]"
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50 dark:bg-charcoal-900 transition-colors duration-300 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-charcoal-900 dark:text-sand-50">
            🛒 Carrito ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
          <button
            onClick={clearCart}
            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-semibold underline"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-charcoal-800 rounded-xl border-2 border-charcoal-900 dark:border-sand-200/30 p-4 flex gap-4 transition-all duration-200"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-sand-100 dark:bg-charcoal-700 rounded-lg overflow-hidden border-2 border-charcoal-900 dark:border-sand-200/30">
                  {item.imagen && (
                    <Image
                      src={item.imagen}
                      alt={item.nombre}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  )}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <Link
                    href={`/producto/${item.slug}`}
                    className="font-bold text-lg text-charcoal-900 dark:text-sand-50 hover:text-[#D74B4B] dark:hover:text-[#D74B4B] transition-colors"
                  >
                    {item.nombre}
                  </Link>
                  <p className="text-charcoal-600 dark:text-sand-400 text-sm mb-2">
                    {store.currencySymbol}{item.precio.toLocaleString('es-AR')} c/u
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded border-2 border-charcoal-900 dark:border-sand-200/30 bg-sand-100 dark:bg-charcoal-700 hover:bg-sand-200 dark:hover:bg-charcoal-600 font-bold transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-bold text-charcoal-900 dark:text-sand-50">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded border-2 border-charcoal-900 dark:border-sand-200/30 bg-sand-100 dark:bg-charcoal-700 hover:bg-sand-200 dark:hover:bg-charcoal-600 font-bold transition-colors"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                    <span className="text-xs text-charcoal-500 dark:text-sand-500 ml-2">
                      (máx: {item.stock})
                    </span>
                  </div>
                </div>

                {/* Subtotal and Remove */}
                <div className="flex flex-col items-end justify-between">
                  <p className="font-bold text-xl text-charcoal-900 dark:text-sand-50">
                    {store.currencySymbol}{(item.precio * item.quantity).toLocaleString('es-AR')}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 text-sm font-semibold"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-charcoal-800 rounded-xl border-2 border-charcoal-900 dark:border-sand-200/30 p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-charcoal-900 dark:text-sand-50 mb-4">
                Resumen
              </h2>
              
              <div className="space-y-3 mb-6 pb-6 border-b-2 border-charcoal-900/10 dark:border-sand-200/20">
                <div className="flex justify-between text-charcoal-700 dark:text-sand-300">
                  <span>Subtotal</span>
                  <span>{store.currencySymbol}{totalPrice.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-charcoal-700 dark:text-sand-300">
                  <span>Envío</span>
                  <span className="text-sm">A calcular</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-charcoal-900 dark:text-sand-50 mb-6">
                <span>Total</span>
                <span>{store.currencySymbol}{totalPrice.toLocaleString('es-AR')}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#D74B4B] to-[#8B3A3A] dark:from-[#8B3A3A] dark:to-[#6B2E2E] text-white font-bold px-8 py-4 rounded-lg hover:from-[#8B3A3A] hover:to-[#3D2424] dark:hover:from-[#6B2E2E] dark:hover:to-[#3D2424] transition-all duration-200 border-2 border-charcoal-900 dark:border-sand-200/30 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(139,58,58,0.5)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
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
                ) : (
                  '💳 Pagar con Mercado Pago'
                )}
              </button>

              <p className="text-xs text-charcoal-500 dark:text-sand-500 text-center mt-4">
                Serás redirigido a Mercado Pago para completar el pago de forma segura
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
