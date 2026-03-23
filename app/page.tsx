import { getProductos, Producto } from '@/lib/supabase'
import ProductGrid from '@/components/ProductGrid'
import { store } from '@/config/store'
import type { Metadata } from 'next'

export const revalidate = 60 // Revalidar cada 60 segundos
export const dynamic = 'force-dynamic' // Deshabilitar static generation

export const metadata: Metadata = {
  title: `${store.name} - Tienda Online`,
  description: store.description,
  openGraph: {
    title: store.name,
    description: store.description,
    type: 'website',
    images: ['/og-image.jpg'],
  },
}

interface HomePageProps {
  searchParams: { search?: string }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  let productos: Producto[] = []
  let filteredProductos: Producto[] = []
  
  try {
    productos = await getProductos(true)
    
    // Filter by search query if present
    if (searchParams.search) {
      const query = searchParams.search.toLowerCase()
      filteredProductos = productos.filter(
        (p) =>
          p.nombre.toLowerCase().includes(query) ||
          p.descripcion?.toLowerCase().includes(query)
      )
    } else {
      filteredProductos = productos
    }
  } catch (error) {
    console.error('Error fetching productos:', error)
  }

  const searchQuery = searchParams.search

  return (
    <div className="min-h-screen bg-surface dark:bg-primary transition-colors duration-300" id="main-content">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-surface-container-low dark:bg-primary-container transition-colors duration-300">
        {/* Ambient depth orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 dark:bg-secondary/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-surface-variant/60 dark:bg-primary-fixed/20 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center animate-fade-in">
            {/* Green accent line */}
            <div className="inline-block mb-6">
              <div className="h-px w-24 bg-gradient-to-r from-secondary/30 via-secondary to-secondary/30"></div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-headline font-black text-on-surface dark:text-on-primary mb-6 tracking-tighter-print leading-[0.95] text-balance transition-colors duration-300">
              {store.name}
            </h1>
            
            <p className="text-lg md:text-xl text-on-surface-variant dark:text-on-primary-fixed-variant max-w-2xl mx-auto leading-relaxed font-body transition-colors duration-300">
              {store.description}
            </p>

            {/* Subtle accent dots */}
            <div className="mt-8 flex justify-center gap-2">
              <div className="h-1.5 w-1.5 bg-secondary rounded-full animate-float"></div>
              <div className="h-1.5 w-1.5 bg-secondary/60 rounded-full animate-float" style={{animationDelay: '0.2s'}}></div>
              <div className="h-1.5 w-1.5 bg-secondary/30 rounded-full animate-float" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-headline font-black text-on-surface dark:text-on-primary mb-2 transition-colors duration-300">
              Resultados para &ldquo;{searchQuery}&rdquo;
            </h2>
            <p className="text-on-surface-variant dark:text-on-primary-fixed-variant font-body transition-colors duration-300">
              {filteredProductos.length} {filteredProductos.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>
        )}

        <ProductGrid productos={filteredProductos} />

        {/* No Results Message */}
        {searchQuery && filteredProductos.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-surface-container dark:bg-primary-container rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <svg className="w-10 h-10 text-on-surface-variant dark:text-on-primary-fixed-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-headline font-black text-on-surface dark:text-on-primary mb-3 transition-colors duration-300">
                No encontramos resultados
              </h3>
              <p className="text-on-surface-variant dark:text-on-primary-fixed-variant mb-6 font-body transition-colors duration-300">
                Intenta con otras palabras o explorá todos los productos
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-surface-container dark:bg-primary-container text-on-surface dark:text-on-primary rounded-md font-headline font-semibold hover:bg-surface-container-high dark:hover:bg-primary-fixed transition-all duration-300 shadow-ambient"
              >
                Ver todos los productos
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-surface-container dark:bg-primary-container py-16 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface dark:text-on-primary mb-4 transition-colors duration-300">
            ¿Tenés dudas sobre algún producto?
          </h2>
          <p className="text-on-surface-variant dark:text-on-primary-fixed-variant mb-8 text-lg font-body transition-colors duration-300">
            Escribinos y te respondemos al instante
          </p>
          <a
            href={`https://wa.me/${store.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-secondary hover:bg-secondary-fixed-dim text-on-secondary px-8 py-4 rounded-md font-headline font-bold text-lg transition-all duration-300 shadow-[0_4px_14px_rgba(0,109,47,0.15)] hover:shadow-[0_6px_20px_rgba(0,109,47,0.25)] group"
          >
            <svg
              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Contactanos por WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
