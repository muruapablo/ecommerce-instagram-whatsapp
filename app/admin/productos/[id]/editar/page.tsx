import { notFound } from 'next/navigation'
import { getProductoById } from '@/lib/supabase'
import ProductForm from '../../ProductForm'

interface EditProductPageProps {
  params: {
    id: string
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  try {
    const producto = await getProductoById(params.id)

    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-sand-50 mb-8">
          Editar Producto
        </h1>
        <ProductForm producto={producto} />
      </div>
    )
  } catch (_error) {
    notFound()
  }
}
