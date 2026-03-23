import Link from 'next/link'
import { store } from '@/config/store'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-surface dark:bg-primary transition-colors duration-300">
      <nav className="bg-surface-container-lowest dark:bg-primary-container border-b border-surface-container-high dark:border-on-primary/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-on-surface dark:text-on-primary transition-colors">
                Admin - {store.name}
              </Link>
              
              <div className="hidden md:flex items-center gap-4">
                <Link
                  href="/admin/productos"
                  className="text-on-surface-variant dark:text-on-primary-fixed-variant hover:text-on-surface dark:hover:text-on-primary transition-colors"
                >
                  Productos
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                target="_blank"
                className="text-on-surface-variant dark:text-on-primary-fixed-variant hover:text-on-surface dark:hover:text-on-primary transition-colors"
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
