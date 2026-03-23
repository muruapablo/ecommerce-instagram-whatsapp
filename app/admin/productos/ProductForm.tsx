'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Producto } from '@/lib/supabase'

interface ProductFormProps {
  producto?: Producto
}

export default function ProductForm({ producto }: ProductFormProps) {
  const router = useRouter()
  const isEditing = !!producto
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url')
  const [formData, setFormData] = useState({
    nombre: producto?.nombre || '',
    slug: producto?.slug || '',
    precio: producto?.precio || 0,
    descripcion: producto?.descripcion || '',
    imagen: producto?.imagen || '',
    stock: producto?.stock || 0,
    activo: producto?.activo ?? true,
  })

  // Estados para mostrar valores formateados en los inputs
  const [precioDisplay, setPrecioDisplay] = useState(
    producto?.precio ? formatNumber(producto.precio, true) : ''
  )
  const [stockDisplay, setStockDisplay] = useState(
    producto?.stock ? formatNumber(producto.stock, false) : ''
  )

  // useEffect para actualizar el formulario cuando el producto cambia (modo edición)
  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        slug: producto.slug || '',
        precio: producto.precio || 0,
        descripcion: producto.descripcion || '',
        imagen: producto.imagen || '',
        stock: producto.stock || 0,
        activo: producto.activo ?? true,
      })
      setPrecioDisplay(producto.precio ? formatNumber(producto.precio, true) : '')
      setStockDisplay(producto.stock ? formatNumber(producto.stock, false) : '')
    }
  }, [producto])

  // Formatear números con separador de miles y decimales
  function formatNumber(value: number | string, isDecimal: boolean): string {
    if (!value && value !== 0) return ''
    
    const num = typeof value === 'string' ? parseFloat(value) : value
    if (isNaN(num)) return ''

    if (isDecimal) {
      // Formato con decimales: 1.234,56
      return num.toLocaleString('es-AR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    } else {
      // Formato sin decimales: 1.234
      return num.toLocaleString('es-AR', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
    }
  }

  // Parsear string formateado a número
  function parseFormattedNumber(value: string): number {
    if (!value) return 0
    // Remover puntos de miles y reemplazar coma decimal por punto
    const cleaned = value.replace(/\./g, '').replace(',', '.')
    const num = parseFloat(cleaned)
    return isNaN(num) ? 0 : num
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number'
          ? parseFloat(value) || 0
          : type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))

    // Auto-generar slug desde nombre
    if (name === 'nombre' && !isEditing) {
      const slug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')

      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  // Handler específico para precio
  const handlePrecioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Remover todo excepto números y coma
    const cleaned = value.replace(/[^\d,]/g, '')
    
    // Separar parte entera y decimal
    const parts = cleaned.split(',')
    const integerPart = parts[0]
    const decimalPart = parts[1]
    
    // Formatear parte entera con puntos cada 3 dígitos
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    
    // Reconstruir con decimales si existen
    const formatted = decimalPart !== undefined 
      ? `${formattedInteger},${decimalPart.slice(0, 2)}` // Limitar a 2 decimales
      : formattedInteger
    
    setPrecioDisplay(formatted)
    
    // Guardar valor numérico real
    const numValue = parseFormattedNumber(formatted)
    setFormData((prev) => ({ ...prev, precio: numValue }))
  }

  const handlePrecioBlur = () => {
    const numValue = formData.precio
    // Formatear con 2 decimales al perder el foco
    if (numValue > 0) {
      setPrecioDisplay(formatNumber(numValue, true))
    } else {
      setPrecioDisplay('')
    }
  }

  const handlePrecioFocus = () => {
    // Mantener el formato actual al hacer foco
    if (formData.precio > 0 && !precioDisplay) {
      setPrecioDisplay(formatNumber(formData.precio, true))
    }
  }

  // Handler específico para stock
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Remover todo excepto números
    const cleaned = value.replace(/\D/g, '')
    
    // Formatear con puntos cada 3 dígitos
    const formatted = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    
    setStockDisplay(formatted)
    
    // Guardar valor numérico real
    const numValue = parseInt(cleaned) || 0
    setFormData((prev) => ({ ...prev, stock: numValue }))
  }

  const handleStockBlur = () => {
    const numValue = formData.stock
    // Formatear al perder el foco
    if (numValue > 0) {
      setStockDisplay(formatNumber(numValue, false))
    } else {
      setStockDisplay('')
    }
  }

  const handleStockFocus = () => {
    // Mantener el formato actual al hacer foco
    if (formData.stock > 0 && !stockDisplay) {
      setStockDisplay(formatNumber(formData.stock, false))
    }
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setFormData((prev) => ({ ...prev, imagen: url }))
      } else {
        const data = await response.json()
        alert(data.error || 'Error al subir la imagen')
      }
    } catch (_error) {
      alert('Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validar campos numéricos
    if (formData.precio <= 0) {
      alert('El precio debe ser mayor a 0')
      return
    }

    if (formData.stock < 0) {
      alert('El stock no puede ser negativo')
      return
    }

    setLoading(true)

    try {
      const url = isEditing
        ? `/api/productos/${producto.id}`
        : '/api/productos'

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/productos')
        router.refresh()
      } else {
        const data = await response.json()
        alert(data.error || 'Error al guardar el producto')
      }
    } catch (_error) {
      alert('Error al guardar el producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-lowest dark:bg-primary-container rounded-lg shadow-sm p-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="md:col-span-2">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-on-surface dark:text-on-primary mb-2"
          >
            Nombre del producto *
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-on-surface/20 dark:border-on-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface dark:bg-primary text-on-surface dark:text-on-primary transition-colors"
            placeholder="Ej: Remera básica negra"
          />
        </div>

        {/* Slug */}
        <div className="md:col-span-2">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-on-surface dark:text-on-primary mb-2"
          >
            Slug (URL amigable) *
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={formData.slug}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-on-surface/20 dark:border-on-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface dark:bg-primary text-on-surface dark:text-on-primary transition-colors"
            placeholder="remera-basica-negra"
          />
          <p className="mt-1 text-sm text-on-surface-variant dark:text-on-primary-fixed-variant">
            URL: /producto/{formData.slug || 'slug'}
          </p>
        </div>

        {/* Precio */}
        <div>
          <label
            htmlFor="precio"
            className="block text-sm font-medium text-on-surface dark:text-on-primary mb-2"
          >
            Precio *
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-on-primary-fixed-variant font-medium">
              $
            </span>
            <input
              id="precio"
              name="precio"
              type="text"
              inputMode="decimal"
              required
              value={precioDisplay}
              onChange={handlePrecioChange}
              onBlur={handlePrecioBlur}
              onFocus={handlePrecioFocus}
              className="w-full pl-8 pr-4 py-2 border border-on-surface/20 dark:border-on-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface dark:bg-primary text-on-surface dark:text-on-primary transition-colors"
              placeholder="0,00"
            />
          </div>
          <p className="mt-1 text-xs text-on-surface-variant dark:text-on-primary-fixed-variant">
            Usa coma para decimales (ej: 1.299,99)
          </p>
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-on-surface dark:text-on-primary mb-2"
          >
            Stock *
          </label>
          <input
            id="stock"
            name="stock"
            type="text"
            inputMode="numeric"
            required
            value={stockDisplay}
            onChange={handleStockChange}
            onBlur={handleStockBlur}
            onFocus={handleStockFocus}
            className="w-full px-4 py-2 border border-on-surface/20 dark:border-on-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface dark:bg-primary text-on-surface dark:text-on-primary transition-colors"
            placeholder="0"
          />
          <p className="mt-1 text-xs text-on-surface-variant dark:text-on-primary-fixed-variant">
            Cantidad disponible
          </p>
        </div>

        {/* Imagen URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-on-surface dark:text-on-primary mb-3">
            Imagen del producto
          </label>

          {/* Tabs para elegir modo */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setUploadMode('url')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                uploadMode === 'url'
                  ? 'bg-gradient-primary text-on-primary'
                  : 'bg-surface-container dark:bg-primary text-on-surface-variant dark:text-on-primary-fixed-variant hover:bg-surface-container-high dark:hover:bg-primary-container'
              }`}
            >
              🔗 URL
            </button>
            <button
              type="button"
              onClick={() => setUploadMode('file')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                uploadMode === 'file'
                  ? 'bg-gradient-primary text-on-primary'
                  : 'bg-surface-container dark:bg-primary text-on-surface-variant dark:text-on-primary-fixed-variant hover:bg-surface-container-high dark:hover:bg-primary-container'
              }`}
            >
              📤 Subir imagen
            </button>
          </div>

          {uploadMode === 'url' ? (
            /* Modo URL */
            <div>
              <input
                id="imagen"
                name="imagen"
                type="url"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-on-surface/20 dark:border-on-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface dark:bg-primary text-on-surface dark:text-on-primary transition-colors"
                placeholder="https://example.com/imagen.jpg"
              />
              <p className="mt-2 text-sm text-on-surface-variant dark:text-on-primary-fixed-variant">
                Puedes usar URLs de Unsplash, Imgur, o tu propio hosting
              </p>
            </div>
          ) : (
            /* Modo Upload */
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full px-4 py-3 border-2 border-dashed border-on-surface/20 dark:border-on-primary/20 rounded-lg hover:border-secondary hover:bg-secondary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subiendo...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 text-on-surface-variant dark:text-on-primary-fixed-variant">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Haz clic para seleccionar una imagen
                  </span>
                )}
              </button>
              <p className="mt-2 text-sm text-on-surface-variant dark:text-on-primary-fixed-variant">
                JPG, PNG, WEBP o GIF. Máximo 5MB
              </p>
            </div>
          )}

          {/* Preview de la imagen */}
          {formData.imagen && (
            <div className="mt-4">
              <p className="text-sm font-medium text-on-surface dark:text-on-primary mb-2">Preview:</p>
              <div className="relative w-full h-64 bg-surface-container dark:bg-primary rounded-lg overflow-hidden">
                <img
                  src={formData.imagen}
                  alt="Preview"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Imagen+no+disponible'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, imagen: '' }))}
                  className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                  title="Eliminar imagen"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Descripción */}
        <div className="md:col-span-2">
          <label
            htmlFor="descripcion"
            className="block text-sm font-medium text-on-surface dark:text-on-primary mb-2"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows={5}
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-on-surface/20 dark:border-on-primary/20 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface dark:bg-primary text-on-surface dark:text-on-primary transition-colors"
            placeholder="Descripción detallada del producto..."
          />
        </div>

        {/* Activo */}
        <div className="md:col-span-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="activo"
              type="checkbox"
              checked={formData.activo}
              onChange={handleChange}
              className="w-5 h-5 text-secondary border-on-surface/20 dark:border-on-primary/20 rounded focus:ring-secondary bg-surface dark:bg-primary"
            />
            <span className="text-sm font-medium text-on-surface dark:text-on-primary">
              Producto activo (visible en la tienda)
            </span>
          </label>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading
            ? 'Guardando...'
            : isEditing
            ? 'Actualizar Producto'
            : 'Crear Producto'}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="bg-surface-container dark:bg-primary text-on-surface dark:text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-surface-container-high dark:hover:bg-primary-container transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
