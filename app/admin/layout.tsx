import Link from 'next/link'
import { store } from '@/config/store'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-charcoal-900 transition-colors duration-300">
      <nav className="bg-white dark:bg-charcoal-800 border-b border-gray-200 dark:border-sand-200/20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-gray-900 dark:text-sand-50 transition-colors">
                Admin - {store.name}
              </Link>
              
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/admin/productos"
                  className="text-gray-600 dark:text-sand-400 hover:text-gray-900 dark:hover:text-sand-50 transition-colors"
                >
                  Productos
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-gray-600 dark:text-sand-400 hover:text-gray-900 dark:hover:text-sand-50 transition-colors"
              >
                Ver tienda
              </Link>
              
              <form action="/api/auth/logout" method="POST">
                <button
                  type="submit"
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors font-semibold"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}
