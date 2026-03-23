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
        {/* Decorative corner gradient accent */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#D74B4B]/30 via-[#8B3A3A]/20 to-transparent dark:from-[#8B3A3A]/30 dark:via-[#6B2E2E]/20 blur-2xl group-hover:blur-3xl group-hover:scale-125 transition-all duration-500 z-0" />
        
        {/* Main card */}
        <div className="relative card card-hover h-full flex flex-col overflow-hidden transition-all duration-300 group-hover:shadow-[8px_8px_0_rgba(0,0,0,0.2)] dark:group-hover:shadow-[8px_8px_0_rgba(255,107,107,0.3)]">
          {/* Image container */}
          <div className="relative aspect-square bg-sand-200 dark:bg-charcoal-800 overflow-hidden">
            <Image
              src={producto.imagen || '/placeholder.jpg'}
              alt={producto.nombre}
              fill
              className="object-cover img-zoom"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Vibrant gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3D2424]/80 via-[#8B3A3A]/30 to-transparent dark:from-[#6B2E2E]/80 dark:via-[#8B3A3A]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Stock overlay */}
            {producto.stock === 0 && (
              <div className="absolute inset-0 bg-charcoal-900/90 dark:bg-charcoal-950/95 flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <span className="block text-sand-50 font-bold text-xl mb-1">AGOTADO</span>
                  <span className="block text-sand-300 dark:text-sand-400 text-sm">Consultar disponibilidad</span>
                </div>
              </div>
            )}
            
            {/* Low stock badge with gradient */}
            {producto.stock > 0 && producto.stock <= 5 && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-[#D74B4B] to-[#8B3A3A] dark:from-[#8B3A3A] to-[#6B2E2E] text-white px-3 py-1 text-xs font-bold tracking-wide shadow-brutal-sm animate-pulse">
                ÚLTIMAS {producto.stock}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-5 flex-grow flex flex-col gap-3 bg-cream dark:bg-charcoal-800 transition-colors duration-300">
            {/* Product name */}
            <h3 className="font-bold text-charcoal-900 dark:text-sand-50 text-lg leading-tight line-clamp-2 group-hover:gradient-text transition-all duration-300">
              {producto.nombre}
            </h3>
            
            {/* Decorative divider with gradient */}
            <div className="h-[2px] w-12 bg-charcoal-900/20 dark:bg-sand-50/20 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#D74B4B] group-hover:via-[#8B3A3A] group-hover:to-[#3D2424] dark:group-hover:from-[#8B3A3A] dark:group-hover:via-[#6B2E2E] dark:group-hover:to-[#3D2424] transition-all duration-500" />
            
            {/* Price */}
            <div className="mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-charcoal-600 dark:text-sand-400 text-sm font-medium transition-colors">{store.currencySymbol}</span>
                <span className="font-serif text-4xl font-normal text-charcoal-900 dark:text-sand-50 tracking-tighter leading-none transition-colors">
                  {producto.precio.toLocaleString('es-AR')}
                </span>
              </div>
            </div>
          </div>
          
          {/* Vibrant gradient hover indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D74B4B] via-[#8B3A3A] to-[#3D2424] dark:from-[#8B3A3A] dark:via-[#6B2E2E] dark:to-[#3D2424] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        </div>
      </article>
    </Link>
  )
}
