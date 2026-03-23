import { NextRequest, NextResponse } from 'next/server'
import { getProductoById, createPedido } from '@/lib/supabase'
import { createPreference } from '@/lib/mercadopago'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Soporte para carrito múltiple o compra individual
    const items = body.items || [
      {
        productId: body.productId,
        quantity: body.quantity || 1,
        price: body.price,
        title: body.title,
      },
    ]

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items provided' },
        { status: 400 }
      )
    }

    // Validar stock y productos
    const validatedItems = []
    let totalAmount = 0

    for (const item of items) {
      const producto = await getProductoById(item.productId)

      if (!producto.activo) {
        return NextResponse.json(
          { error: `Producto ${producto.nombre} no disponible` },
          { status: 400 }
        )
      }

      if (producto.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para ${producto.nombre}` },
          { status: 400 }
        )
      }

      validatedItems.push({
        title: producto.nombre,
        quantity: item.quantity,
        unit_price: producto.precio,
        productId: producto.id,
      })

      totalAmount += producto.precio * item.quantity
    }

    // Crear preferencia de Mercado Pago con múltiples items
    const preference = await createPreference(validatedItems)

    // Crear pedidos para cada producto
    for (const item of validatedItems) {
      await createPedido({
        producto_id: item.productId,
        cantidad: item.quantity,
        precio_total: item.unit_price * item.quantity,
        estado: 'pendiente',
      })
    }

    return NextResponse.json({
      init_point: preference.init_point,
      preference_id: preference.id,
    })
  } catch (error) {
    console.error('Checkout error:', error)

    const message =
      error instanceof Error
        ? error.message
        : 'Error al crear la preferencia de pago'

    return NextResponse.json(
      {
        error: 'Error al crear la preferencia de pago',
        details: process.env.NODE_ENV !== 'production' ? message : undefined,
      },
      { status: 500 }
    )
  }
}
