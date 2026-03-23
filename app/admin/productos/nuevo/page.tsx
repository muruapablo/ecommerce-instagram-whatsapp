import ProductForm from '../ProductForm'

export default function NuevoProductoPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-on-surface dark:text-on-primary mb-8">
        Crear Nuevo Producto
      </h1>
      <ProductForm />
    </div>
  )
}
