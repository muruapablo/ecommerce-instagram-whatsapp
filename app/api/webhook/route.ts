import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mercado Pago envía notificaciones de diferentes tipos
    const { type, action, data } = body

    // Solo procesar notificaciones de pagos
    if (type === 'payment' || action === 'payment.created' || action === 'payment.updated') {
      const paymentId = data?.id

      if (!paymentId) {
        return NextResponse.json({ success: true })
      }

      // Obtener información del pago desde Mercado Pago API
      const mpResponse = await fetch(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.MERCADOPAGO_ACCESS_TOKEN}`,
          },
        }
      )

      if (!mpResponse.ok) {
        console.error('Error fetching payment from MP:', await mpResponse.text())
        return NextResponse.json({ success: true })
      }

      const payment = await mpResponse.json()

      const externalReference = payment.external_reference || ''
      const productIds = externalReference
        .split(',')
        .map((id: string) => id.trim())
        .filter(Boolean)

      if (payment.status === 'approved') {
        // Pago aprobado - actualizar pedido en base de datos
        if (productIds.length === 0) {
          return NextResponse.json({ success: true })
        }

        // Buscar pedidos pendientes de los productos de la referencia
        const { data: pedidos, error: fetchError } = await supabase
          .from('pedidos')
          .select('*')
          .in('producto_id', productIds)
          .eq('estado', 'pendiente')
          .order('created_at', { ascending: false })

        if (fetchError) {
          console.error('Error fetching pedido:', fetchError)
          return NextResponse.json({ error: 'Database error' }, { status: 500 })
        }

        if (pedidos && pedidos.length > 0) {
          // Actualizar pedidos a pagado
          const pedidoIds = pedidos.map((pedido) => pedido.id)
          const { error: updateError } = await supabase
            .from('pedidos')
            .update({
              estado: 'pagado',
              mercadopago_payment_id: paymentId.toString(),
            })
            .in('id', pedidoIds)

          if (updateError) {
            console.error('Error updating pedidos:', updateError)
            return NextResponse.json({ error: 'Database error' }, { status: 500 })
          }

          // Reducir stock por cada pedido pagado
          for (const pedido of pedidos) {
            const { data: producto } = await supabase
              .from('productos')
              .select('stock')
              .eq('id', pedido.producto_id)
              .single()

            if (producto && producto.stock > 0) {
              await supabase
                .from('productos')
                .update({ stock: Math.max(0, producto.stock - pedido.cantidad) })
                .eq('id', pedido.producto_id)
            }
          }

          console.log(`Payment ${paymentId} processed successfully for ${pedidos.length} pedidos`)
        }
      } else if (payment.status === 'rejected' || payment.status === 'cancelled') {
        // Pago rechazado o cancelado - marcar pedido como cancelado
        if (productIds.length === 0) {
          return NextResponse.json({ success: true })
        }

        const { data: pedidos } = await supabase
          .from('pedidos')
          .select('*')
          .in('producto_id', productIds)
          .eq('estado', 'pendiente')
          .order('created_at', { ascending: false })

        if (pedidos && pedidos.length > 0) {
          const pedidoIds = pedidos.map((pedido) => pedido.id)
          await supabase
            .from('pedidos')
            .update({
              estado: 'cancelado',
              mercadopago_payment_id: paymentId.toString(),
            })
            .in('id', pedidoIds)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Mercado Pago también puede enviar GET requests para validar el endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
