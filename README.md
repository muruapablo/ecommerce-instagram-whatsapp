# ecommerce-instagram-whatsapp

Social Ecommerce Template para vender desde Instagram y WhatsApp.

## Caracteristicas

- Catalogo de productos
- Pagina de detalle por producto
- Carrito de compras
- Checkout con Mercado Pago
- Panel admin CRUD de productos
- Integracion WhatsApp
- Link in Bio (/bio)
- Open Graph tags para compartir productos

## Stack

- Next.js 14 + TypeScript + TailwindCSS
- Supabase (PostgreSQL)
- Mercado Pago (Checkout Pro)
- Vercel

## Inicio rapido

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno en `.env.local`:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- MERCADOPAGO_ACCESS_TOKEN
- NEXT_PUBLIC_APP_URL
- ADMIN_USERNAME
- ADMIN_PASSWORD

3. Ejecutar:

```bash
npm run dev
```

## Rutas principales

- `/` catalogo
- `/producto/[slug]` detalle
- `/carrito` carrito
- `/bio` landing para Instagram
- `/admin/login` acceso panel admin

## Deploy

1. Subir repo a GitHub.
2. Importar en Vercel.
3. Cargar variables de entorno.
4. Configurar webhook de Mercado Pago a `/api/webhook`.
