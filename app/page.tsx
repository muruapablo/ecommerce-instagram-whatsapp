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
    <div className="min-h-screen bg-gradient-to-br from-sand-50 via-cream to-sand-100 dark:from-[#1A1625] dark:via-[#1A1625] dark:to-[#2D2640] transition-colors duration-300" id="main-content">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b-2 border-charcoal-900 dark:border-sand-200/20 bg-gradient-to-br from-sand-100 via-cream to-clay-50 dark:from-[#2D2640] dark:via-[#1A1625] dark:to-[#2D2640] transition-colors duration-300">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#D74B4B]/20 to-transparent dark:from-[#8B3A3A]/15 dark:to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-[#6B2E2E]/20 to-transparent dark:from-[#6B2E2E]/15 dark:to-transparent blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          <div className="text-center animate-fadeIn">
            {/* Decorative element */}
            <div className="inline-block mb-6">
              <div className="h-1 w-24 bg-gradient-to-r from-clay-500 to-clay-700 dark:from-clay-400 dark:to-clay-600 rounded-full shadow-sm"></div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-charcoal-900 dark:text-sand-50 mb-6 tracking-tight leading-none transition-colors duration-300">
              {store.name}
            </h1>
            
            <p className="text-lg md:text-xl text-charcoal-600 dark:text-sand-300 max-w-2xl mx-auto leading-relaxed font-medium transition-colors duration-300">
              {store.description}
            </p>

            {/* Decorative bottom accent */}
            <div className="mt-8 flex justify-center gap-2">
              <div className="h-2 w-2 bg-[#D74B4B] dark:bg-[#D74B4B] rounded-full animate-float"></div>
              <div className="h-2 w-2 bg-[#8B3A3A] dark:bg-[#8B3A3A] rounded-full animate-float" style={{animationDelay: '0.2s'}}></div>
              <div className="h-2 w-2 bg-[#6B2E2E] dark:bg-[#6B2E2E] rounded-full animate-float" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8 animate-fadeIn">
            <h2 className="text-2xl md:text-3xl font-black text-charcoal-900 dark:text-sand-50 mb-2 transition-colors duration-300">
              Resultados para &ldquo;{searchQuery}&rdquo;
            </h2>
            <p className="text-charcoal-600 dark:text-sand-300 font-medium transition-colors duration-300">
              {filteredProductos.length} {filteredProductos.length === 1 ? 'producto encontrado' : 'productos encontrados'}
            </p>
          </div>
        )}

        <ProductGrid productos={filteredProductos} />

        {/* No Results Message */}
        {searchQuery && filteredProductos.length === 0 && (
          <div className="text-center py-16 animate-fadeIn">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-sand-200 dark:bg-charcoal-700 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <svg className="w-10 h-10 text-charcoal-400 dark:text-sand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black text-charcoal-900 dark:text-sand-50 mb-3 transition-colors duration-300">
                No encontramos resultados
              </h3>
              <p className="text-charcoal-600 dark:text-sand-300 mb-6 font-medium transition-colors duration-300">
                Intenta con otras palabras o explorá todos los productos
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-clay-600 hover:bg-clay-700 text-white rounded-lg font-bold border-2 border-charcoal-900 dark:border-sand-200/30 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] dark:shadow-[4px_4px_0px_0px_rgba(245,240,228,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(245,240,228,0.2)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                Ver todos los productos
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t-2 border-charcoal-900 dark:border-sand-200/20 bg-gradient-to-br from-sand-100 via-sand-50 to-sand-100 dark:from-[#2D2640] dark:via-[#1A1625] dark:to-[#2D2640] py-16 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-charcoal-900 dark:text-sand-50 mb-4 transition-colors duration-300">
            ¿Tenés dudas sobre algún producto?
          </h2>
          <p className="text-charcoal-600 dark:text-sand-300 mb-8 text-lg font-medium transition-colors duration-300">
            Escribinos y te respondemos al instante
          </p>
          <a
            href={`https://wa.me/${store.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#5A5A5A] to-[#3D2424] hover:from-[#3D2424] hover:to-[#1A1A1A] dark:from-[#6B2E2E] dark:to-[#3D2424] dark:hover:from-[#3D2424] dark:hover:to-[#1A1A1A] text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-charcoal-900 dark:border-sand-200/30 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] dark:shadow-[6px_6px_0px_0px_rgba(245,240,228,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(245,240,228,0.2)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
          >
            <svg
              className="w-6 h-6"
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
