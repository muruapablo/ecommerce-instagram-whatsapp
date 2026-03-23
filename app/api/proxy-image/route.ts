import { NextRequest, NextResponse } from 'next/server'

// Prevent SSRF by blocking private/internal addresses
function isBlockedUrl(urlString: string): boolean {
  try {
    const { hostname } = new URL(urlString)
    const h = hostname.toLowerCase()

    if (['localhost', '127.0.0.1', '::1', '0.0.0.0'].includes(h)) return true

    const privateRanges = [
      /^10\.\d+\.\d+\.\d+$/,
      /^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/,
      /^192\.168\.\d+\.\d+$/,
      /^169\.254\.\d+\.\d+$/, // link-local
      /^fc[0-9a-f]{2}:/i,     // IPv6 ULA
      /^fe[89ab][0-9a-f]:/i,  // IPv6 link-local
    ]
    return privateRanges.some((re) => re.test(h))
  } catch {
    return true
  }
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get('url')

  if (!rawUrl) {
    return NextResponse.json({ error: 'Parámetro url requerido' }, { status: 400 })
  }

  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    return NextResponse.json({ error: 'URL inválida' }, { status: 400 })
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return NextResponse.json({ error: 'Solo se permiten URLs http/https' }, { status: 400 })
  }

  if (isBlockedUrl(rawUrl)) {
    return NextResponse.json({ error: 'URL no permitida' }, { status: 403 })
  }

  try {
    const upstream = await fetch(rawUrl, {
      headers: { Accept: 'image/*' },
      signal: AbortSignal.timeout(10_000),
    })

    if (!upstream.ok) {
      return NextResponse.json({ error: 'No se pudo obtener la imagen' }, { status: 502 })
    }

    const contentType = upstream.headers.get('content-type') ?? ''
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'El recurso no es una imagen' }, { status: 422 })
    }

    const buffer = await upstream.arrayBuffer()

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Error al obtener la imagen' }, { status: 500 })
  }
}
