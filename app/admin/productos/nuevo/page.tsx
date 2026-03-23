import ProductForm from '../ProductForm'

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-sand-50 mb-8">
        Crear Nuevo Producto
      </h1>
      <ProductForm />
    </div>
  )
}
