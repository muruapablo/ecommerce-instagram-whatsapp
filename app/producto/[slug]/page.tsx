import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getProductoBySlug } from '@/lib/supabase'
import AddToCartButton from '@/components/AddToCartButton'
import WhatsAppButton from '@/components/WhatsAppButton'
import { store } from '@/config/store'
import type { Metadata } from 'next'

export const revalidate = 60
export const dynamic = 'force-dynamic' // Deshabilitar static generation

interface ProductPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for Open Graph
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const producto = await getProductoBySlug(params.slug)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tutienda.com'
    const productUrl = `${baseUrl}/producto/${producto.slug}`
    
    return {
      title: producto.nombre,
      description: producto.descripcion || `${producto.nombre} - ${store.currencySymbol}${producto.precio.toLocaleString('es-AR')}`,
      openGraph: {
        type: 'website',
        url: productUrl,
        title: producto.nombre,
        description: producto.descripcion || `${producto.nombre} - Disponible en ${store.name}`,
        siteName: store.name,
        images: [
          {
            url: producto.imagen || '/placeholder.jpg',
            width: 1200,
            height: 1200,
            alt: producto.nombre,
          },
        ],
        locale: 'es_AR',
      },
      twitter: {
        card: 'summary_large_image',
        title: producto.nombre,
        description: `${store.currencySymbol}${producto.precio.toLocaleString('es-AR')} - ${producto.descripcion || producto.nombre}`,
        images: [producto.imagen || '/placeholder.jpg'],
      },
      // Product-specific metadata (schema.org format)
      other: {
        'product:price:amount': producto.precio.toString(),
        'product:price:currency': store.currency,
        'product:availability': producto.stock > 0 ? 'in stock' : 'out of stock',
      },
    }
  } catch (error) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no está disponible',
    }
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const producto = await getProductoBySlug(params.slug)

    return (
      <div className="min-h-screen bg-sand-50 dark:bg-charcoal-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-8 animate-fadeIn">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-charcoal-600 dark:text-sand-400 hover:text-charcoal-900 dark:hover:text-sand-50 transition-colors font-medium group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a productos
            </Link>
          </nav>

          {/* Product Detail */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="relative animate-fadeIn">
              <div className="relative aspect-square bg-white dark:bg-charcoal-800 border-2 border-charcoal-900 dark:border-sand-200/30 rounded-2xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,107,107,0.3)] transition-all duration-300">
                <Image
                  src={producto.imagen || '/placeholder.jpg'}
                  alt={producto.nombre}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Decorative gradient corner accent */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-[#D74B4B]/30 via-[#8B3A3A]/20 to-transparent dark:from-[#8B3A3A]/30 dark:via-[#6B2E2E]/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* Info */}
            <div className="flex flex-col animate-fadeIn delay-100">
              {/* Product Name with gradient effect */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-charcoal-900 dark:text-sand-50 mb-6 leading-tight tracking-tight transition-colors">
                {producto.nombre}
              </h1>

              {/* Price - Large Serif Display with gradient */}
              <div className="mb-8">
                <p className="text-sm font-bold text-charcoal-500 dark:text-sand-400 uppercase tracking-wider mb-2 transition-colors">Precio</p>
                <div className="font-serif text-6xl md:text-7xl font-bold gradient-text tracking-tight">
                  {store.currencySymbol}{producto.precio.toLocaleString('es-AR')}
                </div>
              </div>

              {/* Stock Info with gradients */}
              <div className="mb-8">
                {producto.stock > 0 ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E8D2D2] dark:bg-[#8B3A3A]/20 border-2 border-[#8B3A3A] dark:border-[#D74B4B] rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-[#8B3A3A] dark:bg-[#D74B4B] rounded-full animate-pulse"></div>
                    <p className="text-[#3D2424] dark:text-[#D74B4B] font-bold transition-colors">
                      En stock ({producto.stock} disponibles)
                    </p>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-clay-100 dark:bg-[#8B3A3A]/20 border-2 border-clay-600 dark:border-[#8B3A3A] rounded-lg transition-colors">
                    <div className="w-2 h-2 bg-clay-600 dark:bg-[#8B3A3A] rounded-full"></div>
                    <p className="text-clay-900 dark:text-[#D97676] font-bold transition-colors">Sin stock</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {producto.descripcion && (
                <div className="mb-10">
                  <h2 className="text-2xl font-black text-charcoal-900 dark:text-sand-50 mb-4 uppercase tracking-wide transition-colors">
                    Descripción
                  </h2>
                  <div className="h-1 w-16 bg-gradient-to-r from-[#D74B4B] via-[#8B3A3A] to-[#3D2424] dark:from-[#8B3A3A] dark:via-[#6B2E2E] dark:to-[#3D2424] rounded-full mb-4"></div>
                  <p className="text-charcoal-700 dark:text-sand-300 whitespace-pre-line leading-relaxed text-lg transition-colors">
                    {producto.descripcion}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="mt-auto space-y-4">
                <AddToCartButton producto={producto} showBuyNow={true} />
                <WhatsAppButton
                  productName={producto.nombre}
                  productSlug={producto.slug}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (_error) {
    notFound()
  }
}
