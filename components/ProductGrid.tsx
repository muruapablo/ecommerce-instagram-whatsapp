import { Producto } from '@/lib/supabase'
import ProductCard from './ProductCard'

interface ProductGridProps {
  productos: Producto[]
}

export default function ProductGrid({ productos }: ProductGridProps) {
  if (productos.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-charcoal-400 dark:text-sand-400 text-lg font-medium transition-colors duration-300">No hay productos disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 stagger-children">
      {productos.map((producto, index) => (
        <ProductCard key={producto.id} producto={producto} index={index} />
      ))}
    </div>
  )
}
