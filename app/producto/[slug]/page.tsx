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
      <div className="min-h-screen bg-surface dark:bg-primary transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-on-surface-variant dark:text-on-primary-fixed-variant hover:text-on-surface dark:hover:text-on-primary transition-colors font-body font-medium group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver a productos
            </Link>
          </nav>

          {/* Product Detail */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Image */}
            <div className="relative">
              {/* MonoBoutique: No borders — tonal surface container */}
              <div className="relative aspect-square bg-surface-container-lowest dark:bg-primary-container overflow-hidden shadow-ambient-lg">
                <Image
                  src={producto.imagen || '/placeholder.jpg'}
                  alt={producto.nombre}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle top fade overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary/5 pointer-events-none" />
              </div>
              {/* Ambient green glow */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/8 dark:bg-secondary/15 rounded-full blur-3xl pointer-events-none"></div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {/* Product Name */}
              <h1 className="font-headline font-black text-4xl md:text-5xl lg:text-6xl text-on-surface dark:text-on-primary mb-6 leading-tight tracking-tighter-print transition-colors duration-300">
                {producto.nombre}
              </h1>

              {/* Price */}
              <div className="mb-8">
                <p className="font-body text-xs font-semibold text-on-surface-variant dark:text-on-primary-fixed-variant uppercase tracking-widest mb-2 transition-colors">Precio</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-body text-xl text-on-surface-variant dark:text-on-primary-fixed-variant transition-colors">{store.currencySymbol}</span>
                  <span className="font-headline font-black text-6xl md:text-7xl text-on-surface dark:text-on-primary tracking-tighter-print leading-none transition-colors">
                    {producto.precio.toLocaleString('es-AR')}
                  </span>
                </div>
              </div>

              {/* Stock — MonoBoutique tonal badges */}
              <div className="mb-8">
                {producto.stock > 0 ? (
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-secondary/10 dark:bg-secondary/15 rounded-md transition-colors">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                    <p className="text-secondary font-headline font-semibold text-sm">
                      {producto.stock <= 5 ? `Solo ${producto.stock} disponibles` : 'En stock'}
                    </p>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-surface-container-high dark:bg-primary-container rounded-md transition-colors">
                    <div className="w-2 h-2 bg-on-surface-variant dark:bg-on-primary-fixed-variant rounded-full"></div>
                    <p className="text-on-surface-variant dark:text-on-primary-fixed-variant font-headline font-semibold text-sm transition-colors">Sin stock</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {producto.descripcion && (
                <div className="mb-10">
                  {/* Tonal divider — no solid line */}
                  <div className="h-px w-full bg-surface-variant dark:bg-primary-container mb-6 transition-colors"></div>
                  <h2 className="font-headline font-bold text-xs uppercase tracking-widest text-on-surface-variant dark:text-on-primary-fixed-variant mb-4 transition-colors">
                    Descripción
                  </h2>
                  <p className="font-body text-on-surface dark:text-on-primary/80 whitespace-pre-line leading-relaxed text-base transition-colors">
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
