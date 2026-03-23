import Link from 'next/link'
import Image from 'next/image'
import { getProductos } from '@/lib/supabase'
import DeleteProductButton from './DeleteProductButton'

export const revalidate = 0 // No cachear en admin
export const dynamic = 'force-dynamic' // Deshabilitar static generation

export default async function AdminProductosPage() {
  const productos = await getProductos(false) // Traer todos, incluso inactivos

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-sand-50">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="bg-gradient-to-r from-[#D74B4B] to-[#8B3A3A] dark:from-[#8B3A3A] dark:to-[#6B2E2E] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#8B3A3A] hover:to-[#3D2424] dark:hover:from-[#6B2E2E] dark:hover:to-[#3D2424] transition-all border-2 border-charcoal-900 dark:border-sand-200/30"
        >
          + Nuevo Producto
        </Link>
      </div>

      {productos.length === 0 ? (
        <div className="bg-white dark:bg-charcoal-800 rounded-lg shadow-sm p-12 text-center border-2 border-gray-200 dark:border-sand-200/20">
          <p className="text-gray-600 dark:text-sand-400 mb-4">No hay productos todavía</p>
          <Link
            href="/admin/productos/nuevo"
            className="text-[#D74B4B] dark:text-[#D97676] hover:text-[#8B3A3A] dark:hover:text-[#D74B4B] font-semibold transition-colors"
          >
            Crear el primer producto
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-charcoal-800 rounded-lg shadow-sm overflow-hidden border-2 border-gray-200 dark:border-sand-200/20">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-sand-200/20">
            <thead className="bg-gray-50 dark:bg-charcoal-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-sand-400 uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-sand-400 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-sand-400 uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-sand-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-sand-400 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-sand-400 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-charcoal-800 divide-y divide-gray-200 dark:divide-sand-200/20">
              {productos.map((producto) => (
                <tr key={producto.id} className="hover:bg-gray-50 dark:hover:bg-charcoal-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-16 h-16 bg-gray-100 dark:bg-charcoal-700 rounded border-2 border-gray-200 dark:border-sand-200/20">
                      <Image
                        src={producto.imagen || '/placeholder.jpg'}
                        alt={producto.nombre}
                        fill
                        className="object-cover rounded"
                        sizes="64px"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-sand-50">
                      {producto.nombre}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-sand-400">
                      /{producto.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-sand-50">
                      ${producto.precio.toLocaleString('es-AR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-sand-50">
                      {producto.stock} unidades
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        producto.activo
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                      }`}
                    >
                      {producto.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/productos/${producto.id}/editar`}
                      className="text-gray-600 dark:text-sand-300 hover:text-gray-900 dark:hover:text-sand-50 mr-4 font-semibold transition-colors"
                    >
                      Editar
                    </Link>
                    <DeleteProductButton id={producto.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
