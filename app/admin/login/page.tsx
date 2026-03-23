'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Credenciales incorrectas')
      }
    } catch (_err) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-charcoal-900 px-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-charcoal-800 rounded-lg shadow-md border-2 border-gray-200 dark:border-sand-200/20 p-8 transition-colors duration-300">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-sand-50 mb-6 text-center transition-colors">
          Panel de Administración
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 dark:text-sand-300 mb-1 transition-colors"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-sand-200/30 rounded-lg focus:ring-2 focus:ring-[#D74B4B] dark:focus:ring-[#8B3A3A] focus:border-transparent bg-white dark:bg-charcoal-700 text-gray-900 dark:text-sand-50 transition-colors"
              placeholder="admin"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-sand-300 mb-1 transition-colors"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-sand-200/30 rounded-lg focus:ring-2 focus:ring-[#D74B4B] dark:focus:ring-[#8B3A3A] focus:border-transparent bg-white dark:bg-charcoal-700 text-gray-900 dark:text-sand-50 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg transition-colors">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#D74B4B] to-[#8B3A3A] dark:from-[#8B3A3A] dark:to-[#6B2E2E] text-white py-3 rounded-lg font-semibold hover:from-[#8B3A3A] hover:to-[#3D2424] dark:hover:from-[#6B2E2E] dark:hover:to-[#3D2424] disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all border-2 border-charcoal-900 dark:border-sand-200/30"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
