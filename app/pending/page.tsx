import Link from 'next/link'

export default function PendingPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-primary flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        <div className="bg-surface-container-lowest dark:bg-primary-container rounded-2xl shadow-sm p-8 md:p-12 text-center animate-fadeIn transition-all duration-300">
          {/* Pending Icon */}
          <div className="w-20 h-20 bg-surface-container dark:bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-on-surface-variant dark:text-on-primary-fixed-variant"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-on-surface dark:text-on-primary mb-4 tracking-tight transition-colors">
            Pago pendiente
          </h1>
          
          <div className="h-1 w-24 bg-on-surface/20 dark:bg-on-primary/20 rounded-full mx-auto mb-6"></div>
          
          <p className="text-lg text-on-surface-variant dark:text-on-primary-fixed-variant mb-10 leading-relaxed font-medium transition-colors">
            Tu pago está siendo procesado. Te notificaremos cuando se confirme.
          </p>

          <Link
            href="/"
            className="inline-block w-full md:w-auto px-10 py-4 bg-gradient-primary text-on-primary rounded-lg font-bold text-lg hover:opacity-90 transition-all duration-200"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
