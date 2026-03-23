import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-sand-50 dark:bg-charcoal-900 flex items-center justify-center py-16 px-4 transition-colors duration-300">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-charcoal-800 border-2 border-charcoal-900 dark:border-sand-200/30 rounded-2xl shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] dark:shadow-[8px_8px_0px_0px_rgba(90,90,90,0.5)] p-8 md:p-12 text-center animate-fadeIn transition-all duration-300">
          {/* Success Icon with gradient */}
          <div className="w-20 h-20 bg-gradient-to-br from-[#5A5A5A] to-[#3D2424] dark:from-[#6B2E2E] dark:to-[#3D2424] rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-charcoal-900 dark:border-[#8B3A3A] shadow-lg animate-scaleIn">
            <svg
              className="w-10 h-10 text-white"
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

          <h1 className="text-4xl md:text-5xl font-black text-charcoal-900 dark:text-sand-50 mb-4 tracking-tight transition-colors">
            ¡Pago exitoso!
          </h1>
          
          <div className="h-1 w-24 bg-gradient-to-r from-[#5A5A5A] to-[#3D2424] dark:from-[#6B2E2E] dark:to-[#3D2424] rounded-full mx-auto mb-6"></div>
          
          <p className="text-lg text-charcoal-600 dark:text-sand-300 mb-10 leading-relaxed font-medium transition-colors">
            Tu compra fue procesada correctamente. En breve recibirás un email de confirmación.
          </p>

          <Link
            href="/"
            className="inline-block w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#5A5A5A] to-[#3D2424] dark:from-[#6B2E2E] dark:to-[#3D2424] hover:from-[#3D2424] hover:to-[#1A1A1A] dark:hover:from-[#3D2424] dark:hover:to-[#1A1A1A] text-white rounded-lg font-bold text-lg border-2 border-charcoal-900 dark:border-sand-200/30 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] dark:shadow-[6px_6px_0px_0px_rgba(90,90,90,0.5)] hover:shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(90,90,90,0.7)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-200"
          >
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  )
}
