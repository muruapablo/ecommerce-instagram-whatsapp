import { MercadoPagoConfig, Preference } from 'mercadopago'

const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || 'dummy-token'

// Initialize MercadoPago client
const client = new MercadoPagoConfig({ 
  accessToken,
  options: { timeout: 5000 }
})

const preference = new Preference(client)

export interface CheckoutItem {
  title: string
  quantity: number
  unit_price: number
  productId: string
}

const isLikelyInvalidToken = (token: string) => {
  return (
    !token ||
    token === 'dummy-token' ||
    token.includes('your_mercadopago_access_token_here')
  )
}

const sanitizeTitle = (title: string) => {
  // Mercado Pago recomienda titulos cortos y sin caracteres problematicos.
  return title
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120)
}

// Acepta un array de items o un solo item
export const createPreference = async (data: CheckoutItem | CheckoutItem[]) => {
  try {
    if (isLikelyInvalidToken(accessToken)) {
      throw new Error(
        'MERCADOPAGO_ACCESS_TOKEN no configurado. Usa credenciales TEST reales de Mercado Pago Developers.'
      )
    }

    const rawBaseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const baseUrl = rawBaseUrl.replace(/\/$/, '')
    const items = Array.isArray(data) ? data : [data]
    
    // Preparar items para Mercado Pago
    const mpItems = items.map(item => ({
      id: item.productId,
      title: sanitizeTitle(item.title),
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: 'ARS',
    }))

    // External reference con todos los IDs
    const productIds = items.map(item => item.productId).join(',')

    const shouldSendWebhookUrl =
      /^https:\/\//.test(baseUrl) && !baseUrl.includes('localhost') && !baseUrl.includes('127.0.0.1')
    const shouldUseAutoReturn = /^https:\/\//.test(baseUrl)

    const body: Record<string, unknown> = {
      items: mpItems,
      back_urls: {
        success: `${baseUrl}/success`,
        failure: `${baseUrl}/failure`,
        pending: `${baseUrl}/pending`,
      },
      external_reference: productIds,
      metadata: {
        product_ids: productIds,
        item_count: items.length,
      },
    }

    if (shouldUseAutoReturn) {
      body.auto_return = 'approved'
    }

    // En local o cuentas nuevas, estos campos opcionales pueden disparar bloqueos de policy.
    if (shouldSendWebhookUrl) {
      body.notification_url = `${baseUrl}/api/webhook`
    }

    const result = await preference.create({ body })

    return result
  } catch (error) {
    console.error('Error creating MercadoPago preference:', error)
    throw error
  }
}

export { client as mercadopago }
export default client
