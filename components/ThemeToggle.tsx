'use client'

import { useTheme } from './ThemeProvider'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-10 h-5 bg-gray-300 rounded-full" />
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="group relative w-10 h-5 bg-gradient-to-r from-charcoal-800 to-charcoal-700 dark:from-clay-700 dark:to-clay-600 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-clay-500/50"
      aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {/* Slider knob */}
      <div
        className={`absolute top-0.5 w-4 h-4 bg-white dark:bg-sand-100 rounded-full shadow-md transition-all duration-300 flex items-center justify-center ${
          theme === 'light' ? 'left-0.5' : 'left-5'
        }`}
      >
        {/* Mini icon inside knob */}
        <div className="w-2.5 h-2.5">
          {/* Sun icon (light mode) */}
          <svg
            className={`absolute inset-0 text-amber-500 transition-all duration-300 ${
              theme === 'light'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-0'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>

          {/* Moon icon (dark mode) */}
          <svg
            className={`absolute inset-0 text-clay-600 transition-all duration-300 ${
              theme === 'dark'
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-0'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
      </div>
    </button>
  )
}
