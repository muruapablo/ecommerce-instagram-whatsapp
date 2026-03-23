'use client'

import { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm?: () => void
  title: string
  message: string
  type?: 'info' | 'warning' | 'error' | 'success'
  confirmText?: string
  cancelText?: string
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'info',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEscape)
      
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const iconColors = {
    info: 'from-sand-500 to-sand-600',
    warning: 'from-clay-500 to-clay-600',
    error: 'from-clay-600 to-clay-700',
    success: 'from-[#5A5A5A] to-[#3D2424]',
  }

  const icons = {
    info: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    success: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-charcoal-900/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white border-2 border-charcoal-900 rounded-2xl shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] max-w-md w-full p-8 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className={`w-16 h-16 bg-gradient-to-br ${iconColors[type]} rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-charcoal-900 shadow-lg`}>
          {icons[type]}
        </div>

        {/* Title */}
        <h2
          id="modal-title"
          className="text-2xl md:text-3xl font-black text-charcoal-900 mb-4 text-center tracking-tight"
        >
          {title}
        </h2>

        {/* Divider */}
        <div className="h-1 w-16 bg-clay-600 rounded-full mx-auto mb-6" />

        {/* Message */}
        <p className="text-charcoal-700 text-center mb-8 leading-relaxed font-medium">
          {message}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-white text-charcoal-900 border-2 border-charcoal-900 rounded-lg font-bold hover:bg-sand-100 transition-colors"
          >
            {cancelText}
          </button>
          
          {onConfirm && (
            <button
              onClick={() => {
                onConfirm()
                onClose()
              }}
              className="flex-1 px-6 py-3 bg-clay-600 text-white border-2 border-charcoal-900 rounded-lg font-bold shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
