import { getProductos } from '@/lib/supabase'
import { store } from '@/config/store'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: `${store.name} - Link in Bio`,
  description: `Productos destacados de ${store.name}. ${store.description}`,
  openGraph: {
    title: `Θ�� ${store.name}`,
    description: store.description,
    type: 'website',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: store.name,
    description: store.description,
  },
}

export default async function BioPage() {
  let productos = null
  let error = null
  
  try {
    productos = await getProductos(true)
  } catch (e) {
    console.error('Error fetching productos in bio page:', e)
    error = e
  }
  
  const featuredProducts = productos?.slice(0, 6) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D74B4B] via-[#8B3A3A] to-[#1a1a1a] relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
        <div className="absolute bottom-32 right-10 w-96 h-96 bg-[#3D2424] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#6B2E2E] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '6s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 py-12 max-w-md mx-auto">
        {/* Header with store logo/name - Animated entry */}
        <div className="text-center mb-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="inline-block p-1 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl backdrop-blur-sm border border-white/30 shadow-2xl mb-4">
            <div className="bg-gradient-to-br from-white via-sand-50 to-white px-8 py-6 rounded-xl">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#D74B4B] via-[#8B3A3A] to-[#3D2424] bg-clip-text text-transparent">
                {store.name}
              </h1>
            </div>
          </div>
          <p className="text-white/90 text-lg font-medium tracking-wide drop-shadow-lg">
            {store.description}
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {/* WhatsApp CTA */}
          <a
            href={`https://wa.me/${store.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white hover:bg-sand-50 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:-rotate-1 shadow-2xl border-2 border-white/50 animate-fadeIn"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-green-600 group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              <span className="font-bold text-charcoal-900 text-sm">Consultar</span>
            </div>
          </a>

          {/* Ver Productos CTA */}
          <Link
            href="/"
            className="group relative overflow-hidden bg-white hover:bg-sand-50 rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-2xl border-2 border-white/50 animate-fadeIn"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D74B4B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10">
              <svg
                className="w-12 h-12 mx-auto mb-2 text-[#D74B4B] group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="font-bold text-charcoal-900 text-sm">Ver Todo</span>
            </div>
          </Link>
        </div>

        {/* Featured Products - Stacked Cards Effect */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            ✨ Destacados
          </h2>
          
          {featuredProducts.length === 0 ? (
            <div className="text-center py-12 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-white/50">
                <p className="text-charcoal-600 text-lg mb-4">
                  {error ? '⚠️ Error cargando productos' : '📦 No hay productos disponibles'}
                </p>
                <p className="text-charcoal-500 text-sm">
                  {error ? 'Por favor intenta nuevamente más tarde' : 'Pronto agregaremos productos nuevos'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {featuredProducts.map((producto, index) => (
                <Link
                  key={producto.id}
                  href={`/producto/${producto.slug}`}
                  className="group block animate-fadeIn"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden bg-white rounded-2xl shadow-2xl hover:shadow-[#D74B4B]/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border-2 border-white/50">
                    {/* Product Image */}
                    <div className="relative h-48 bg-gradient-to-br from-sand-100 to-sand-50 overflow-hidden">
                      {producto.imagen && (
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          sizes="(max-width: 448px) 100vw, 448px"
                        />
                      )}
                      {/* Price Badge */}
                      <div className="absolute top-4 right-4 bg-[#D74B4B] text-white px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border-2 border-white">
                        {store.currencySymbol}{producto.precio?.toLocaleString('es-AR')}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-charcoal-900 text-lg mb-1 group-hover:text-[#D74B4B] transition-colors">
                        {producto.nombre}
                      </h3>
                      {producto.descripcion && (
                        <p className="text-charcoal-600 text-sm line-clamp-2">
                          {producto.descripcion}
                        </p>
                      )}
                    </div>

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D74B4B]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Social Links */}
        <div className="text-center pt-8 border-t-2 border-white/30 animate-fadeIn" style={{ animationDelay: '1s' }}>
          <p className="text-white/80 text-sm mb-4 font-medium">Síguenos en Instagram</p>
          <a
            href={`https://instagram.com/${store.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white hover:bg-sand-50 text-charcoal-900 font-bold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-xl border-2 border-white/50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            @{store.instagram}
          </a>
        </div>
      </div>

      {/* Corner decorative element */}
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-white/10 to-transparent rounded-tl-full"></div>
      <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-br-full"></div>
    </div>
  )
}
