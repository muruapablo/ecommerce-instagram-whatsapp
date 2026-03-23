'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteProductButtonProps {
  id: string
}

export default function DeleteProductButton({ id }: DeleteProductButtonProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) {
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/productos/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.refresh()
      } else {
        alert('Error al eliminar el producto')
      }
    } catch (_error) {
      alert('Error al eliminar el producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 disabled:opacity-50 font-semibold transition-colors"
    >
      {loading ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}
