import Link from 'next/link'

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-on-surface dark:text-on-primary mb-8">
        Panel de Administración
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/productos"
          className="bg-surface-container-lowest dark:bg-primary-container p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-surface-container-low dark:hover:bg-primary"
        >
          <div className="text-secondary mb-4">
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
          <h2 className="text-xl font-semibold text-on-surface dark:text-on-primary mb-2">
            Productos
          </h2>
          <p className="text-on-surface-variant dark:text-on-primary-fixed-variant">
            Gestionar productos de la tienda
          </p>
        </Link>

        <Link
          href="/"
          target="_blank"
          className="bg-surface-container-lowest dark:bg-primary-container p-6 rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-surface-container-low dark:hover:bg-primary"
        >
          <div className="text-on-surface-variant dark:text-on-primary-fixed-variant mb-4">
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
          <h2 className="text-xl font-semibold text-on-surface dark:text-on-primary mb-2">
            Ver tienda
          </h2>
          <p className="text-on-surface-variant dark:text-on-primary-fixed-variant">
            Abrir la tienda en una nueva pestaña
          </p>
        </Link>
      </div>
    </div>
  )
}
