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
        <h1 className="text-3xl font-bold text-on-surface dark:text-on-primary">Productos</h1>
        <Link
          href="/admin/productos/nuevo"
          className="bg-gradient-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
        >
          + Nuevo Producto
        </Link>
      </div>

      {productos.length === 0 ? (
        <div className="bg-surface-container-lowest dark:bg-primary-container rounded-lg shadow-sm p-12 text-center">
          <p className="text-on-surface-variant dark:text-on-primary-fixed-variant mb-4">No hay productos todavía</p>
          <Link
            href="/admin/productos/nuevo"
            className="text-secondary hover:opacity-80 font-semibold transition-colors"
          >
            Crear el primer producto
          </Link>
        </div>
      ) : (
        <div className="bg-surface-container-lowest dark:bg-primary-container rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-surface-container dark:divide-on-primary/10">
            <thead className="bg-surface-container-low dark:bg-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant dark:text-on-primary-fixed-variant uppercase tracking-wider">
                  Imagen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant dark:text-on-primary-fixed-variant uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant dark:text-on-primary-fixed-variant uppercase tracking-wider">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant dark:text-on-primary-fixed-variant uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant dark:text-on-primary-fixed-variant uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-on-surface-variant dark:text-on-primary-fixed-variant uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface-container-lowest dark:bg-primary-container divide-y divide-surface-container dark:divide-on-primary/10">
              {productos.map((producto) => (
                <tr key={producto.id} className="hover:bg-surface-container-low dark:hover:bg-primary transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-16 h-16 bg-surface-container dark:bg-primary rounded">
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
                    <div className="text-sm font-medium text-on-surface dark:text-on-primary">
                      {producto.nombre}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-on-surface dark:text-on-primary">
                      ${producto.precio.toLocaleString('es-AR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-on-surface dark:text-on-primary">
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
                      className="text-on-surface-variant dark:text-on-primary-fixed-variant hover:text-on-surface dark:hover:text-on-primary mr-4 font-semibold transition-colors"
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
