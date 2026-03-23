import { NextRequest, NextResponse } from 'next/server'
import { createProducto } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { nombre, slug, precio, descripcion, imagen, stock, activo } = body

    // Validaciones básicas
    if (!nombre || !slug || precio === undefined || stock === undefined) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    const producto = await createProducto({
      nombre,
      slug,
      precio: parseFloat(precio),
      descripcion: descripcion || '',
      imagen: imagen || '',
      stock: parseInt(stock),
      activo: activo ?? true,
    })

    return NextResponse.json(producto, { status: 201 })
  } catch (error: unknown) {
    console.error('Error creating product:', error)
    
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return NextResponse.json(
        { error: 'Ya existe un producto con ese slug' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al crear el producto' },
      { status: 500 }
    )
  }
}
