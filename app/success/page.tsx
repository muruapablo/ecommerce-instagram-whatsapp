import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-primary flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        <div className="bg-surface-container-lowest dark:bg-primary-container rounded-2xl shadow-sm p-8 md:p-12 text-center animate-fadeIn transition-all duration-300">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-on-surface dark:text-on-primary mb-4 tracking-tight transition-colors">
            ¡Pago exitoso!
          </h1>
          
          <div className="h-1 w-24 bg-secondary/40 rounded-full mx-auto mb-6"></div>
          
          <p className="text-lg text-on-surface-variant dark:text-on-primary-fixed-variant mb-10 leading-relaxed font-medium transition-colors">
            Tu compra fue procesada correctamente. En breve recibirás un email de confirmación.
          </p>

          <Link
            href="/"
            className="inline-block w-full md:w-auto px-10 py-4 bg-gradient-secondary text-on-secondary rounded-lg font-bold text-lg hover:opacity-90 transition-all duration-200"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
