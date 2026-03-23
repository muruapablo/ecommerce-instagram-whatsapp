import Link from 'next/link'
import Image from 'next/image'
import { Producto } from '@/lib/supabase'
import { store } from '@/config/store'

interface ProductCardProps {
  producto: Producto
  index?: number
}

export default function ProductCard({ producto, index = 0 }: ProductCardProps) {
  const animationDelay = `${index * 100}ms`
  
  return (
    <Link
      href={`/producto/${producto.slug}`}
      className="group block animate-fade-in-up"
      style={{ animationDelay }}
    >
      <article className="relative h-full">
        {/* MonoBoutique: No borders, only tonal layering */}
        <div className="relative bg-surface-container-lowest dark:bg-primary-fixed-dim h-full flex flex-col overflow-hidden transition-all duration-500 group-hover:shadow-ambient-lg">
          
          {/* Image container - Asymmetry: bleeds to edges */}
          <div className="relative aspect-square bg-surface-container dark:bg-primary-container overflow-hidden">
            <Image
              src={producto.imagen || '/placeholder.jpg'}
              alt={producto.nombre}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Subtle overlay on hover (no harsh gradients) */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 dark:group-hover:bg-primary/30 transition-all duration-500" />
            
            {/* Stock overlay - MonoBoutique style */}
            {producto.stock === 0 && (
              <div className="absolute inset-0 bg-primary/90 dark:bg-primary/95 flex items-center justify-center backdrop-blur-xs">
                <div className="text-center">
                  <span className="block font-headline font-bold text-lg text-on-primary uppercase tracking-wide mb-1">Agotado</span>
                  <span className="block font-body text-sm text-on-primary-fixed-variant">Consultar disponibilidad</span>
                </div>
              </div>
            )}
            
            {/* Low stock badge - Subtle, not aggressive */}
            {producto.stock > 0 && producto.stock <= 5 && (
              <div className="absolute top-3 right-3 bg-tertiary text-on-tertiary px-3 py-1.5 text-xs font-headline font-bold tracking-wide rounded-sm">
                ÚLTIMAS {producto.stock}
              </div>
            )}
          </div>
          
          {/* Content - Inset with generous spacing */}
          <div className="px-5 py-5 flex-grow flex flex-col gap-3 bg-surface-container-lowest dark:bg-primary-fixed-dim transition-colors duration-300">
            {/* Product name - Manrope with tight tracking */}
            <h3 className="font-headline font-bold text-on-surface dark:text-on-primary text-lg leading-tight tracking-tighter-print line-clamp-2 group-hover:text-primary-fixed dark:group-hover:text-on-primary-fixed-variant transition-colors duration-300">
              {producto.nombre}
            </h3>
            
            {/* MonoBoutique: No divider line, use spacing.0.5 gap instead */}
            <div className="h-1" />
            
            {/* Price - Editorial style */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-1.5">
                <span className="font-body text-sm font-medium text-on-surface-variant dark:text-on-primary-fixed-variant transition-colors">{store.currencySymbol}</span>
                <span className="font-headline text-3xl font-semibold text-on-surface dark:text-on-primary tracking-tight leading-none transition-colors">
                  {producto.precio.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Subtle bottom accent (no harsh colored bars) */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface-variant dark:bg-primary-container transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </article>
    </Link>
  )
}
