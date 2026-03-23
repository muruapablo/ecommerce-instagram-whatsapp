import Link from 'next/link'

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-sand-50 mb-8">
        Panel de Administración
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/productos"
          className="bg-white dark:bg-charcoal-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-charcoal-900 dark:hover:border-sand-200/30"
        >
          <div className="text-[#D74B4B] dark:text-[#D97676] mb-4">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-sand-50 mb-2">
            Productos
          </h2>
          <p className="text-gray-600 dark:text-sand-400">
            Gestionar productos de la tienda
          </p>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="bg-white dark:bg-charcoal-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-charcoal-900 dark:hover:border-sand-200/30"
        >
          <div className="text-[#5A5A5A] dark:text-[#8B3A3A] mb-4">
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-sand-50 mb-2">
            Ver tienda
          </h2>
          <p className="text-gray-600 dark:text-sand-400">
            Abrir la tienda en una nueva pestaña
          </p>
        </Link>
      </div>
    </div>
  )
}
