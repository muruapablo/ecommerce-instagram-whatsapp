# Ecommerce Template - Instagram & WhatsApp

Template de ecommerce optimizado para vender productos desde Instagram y WhatsApp.

## Stack Tecnológico

- **Frontend**: Next.js 14 (App Router) + TypeScript + TailwindCSS
- **Backend**: Next.js API Routes
- **Base de datos**: Supabase (PostgreSQL)
- **Pagos**: Mercado Pago
- **Hosting**: Vercel (recomendado)

---

## Características

- Catálogo de productos con imágenes
- Páginas de producto individuales
- Integración con WhatsApp para consultas
- Checkout con Mercado Pago
- Panel de administración para gestionar productos (CRUD)
- Mobile-first design
- Arquitectura escalable para múltiples tiendas

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone [tu-repo]
cd ecommerce-con-instagram-y-whatsapp
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_de_supabase

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=tu_access_token_de_mercadopago

# Admin (cambia estas credenciales)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro

# URL de la aplicación
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Configuración de Supabase

### 1. Crear proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia la URL y la Anon Key desde Project Settings > API

### 2. Ejecutar el schema SQL

1. Ve a SQL Editor en Supabase
2. Abre el archivo `supabase-schema.sql` de este proyecto
3. Copia y pega el contenido completo
4. Ejecuta el SQL

Esto creará las tablas `productos` y `pedidos` con sus políticas de seguridad.

### 3. Configurar Supabase Storage (para subir imágenes)

#### Paso 1: Crear el bucket

1. En tu proyecto de Supabase, ve a **Storage** (menú lateral)
2. Haz clic en **New bucket**
3. Configura:
   - **Name**: `productos` (exactamente así, en minúsculas)
   - **Public bucket**: ✅ **ACTIVADO** (muy importante)
   - **File size limit**: `5242880` (5MB, opcional)
4. Haz clic en **Create bucket**

#### Paso 2: Configurar política de acceso público

1. Haz clic en el bucket **productos**
2. Ve a la pestaña **Policies**
3. Haz clic en **New Policy** → **For full customization**
4. Completa:
   - **Policy name**: `Public Access`
   - **Policy command**: **SELECT**
   - **Target roles**: `public`
   - **USING expression**:
     ```sql
     bucket_id = 'productos'
     ```
5. Clic en **Review** → **Save policy**

**Alternativa rápida**: Ejecuta este SQL en el SQL Editor:
```sql
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'productos');
```

#### Paso 3: Agregar Service Role Key

1. Ve a **Settings** → **API** en Supabase
2. Copia la **service_role key** (sección Project API keys)
3. Agrégala a tu `.env.local`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
   ```
   
⚠️ **Importante**: La service_role key es secreta. Nunca la expongas en el frontend ni la subas a GitHub.

Esto permite:
- ✅ Subir imágenes desde el panel de admin
- ✅ Ver imágenes públicamente en la tienda
- ✅ Realizar operaciones CRUD en productos (bypasea RLS)

---

## Configuración de Mercado Pago

### 1. Crear cuenta de Mercado Pago

1. Crea una cuenta en [mercadopago.com](https://www.mercadopago.com.ar)
2. Ve a Tus integraciones > Credenciales
3. Usa las credenciales de **Prueba** para desarrollo
4. Usa las credenciales de **Producción** cuando vayas a lanzar

### 2. Configurar webhook

El webhook es el endpoint que Mercado Pago llama cuando hay un cambio en el pago.

**En desarrollo (con ngrok o similar)**:
```
https://tu-dominio-temporal.ngrok.io/api/webhook
```

**En producción (Vercel)**:
```
https://tu-tienda.vercel.app/api/webhook
```

Configura el webhook en: Tus integraciones > Webhooks

---

## Configuración de la tienda

Edita el archivo `config/store.ts` con la información de tu tienda:

```typescript
export const store = {
  name: "Mi Tienda",
  description: "Descripción de mi tienda",
  whatsapp: "5493510000000", // Código país + área + número
  instagram: "mitienda",
  logo: "/logo.png",
  primaryColor: "#000000",
  currency: "ARS",
  currencySymbol: "$",
}
```

---

## Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## Acceder al panel de administración

1. Ve a `http://localhost:3000/admin/login`
2. Usa las credenciales configuradas en `.env.local`
3. Gestiona tus productos desde `/admin/productos`

---

## Deploy en Vercel

### 1. Preparar el proyecto

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [tu-repo-github]
git push -u origin main
```

### 2. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio de GitHub
3. Configura las variables de entorno (copia desde `.env.local`)
4. Deploy

### 3. Configurar dominio

En Vercel, ve a Settings > Domains y agrega tu dominio personalizado.

### 4. Actualizar variables de entorno

Actualiza `NEXT_PUBLIC_APP_URL` con tu dominio de producción:

```
NEXT_PUBLIC_APP_URL=https://tu-tienda.vercel.app
```

### 5. Configurar webhook de Mercado Pago

Actualiza la URL del webhook en Mercado Pago con tu dominio de producción.

---

## Estructura del proyecto

```
├── app/
│   ├── page.tsx                    # Página principal
│   ├── layout.tsx                  # Layout principal
│   ├── globals.css                 # Estilos globales
│   ├── producto/[slug]/
│   │   └── page.tsx                # Página de producto
│   ├── admin/
│   │   ├── page.tsx                # Dashboard admin
│   │   ├── layout.tsx              # Layout admin
│   │   ├── login/page.tsx          # Login admin
│   │   └── productos/
│   │       ├── page.tsx            # Lista productos
│   │       ├── nuevo/page.tsx      # Crear producto
│   │       ├── [id]/editar/page.tsx # Editar producto
│   │       └── ProductForm.tsx     # Formulario producto
│   ├── success/page.tsx            # Pago exitoso
│   ├── failure/page.tsx            # Pago fallido
│   ├── pending/page.tsx            # Pago pendiente
│   └── api/
│       ├── checkout/route.ts       # Crear preferencia MP
│       ├── webhook/route.ts        # Recibir notificaciones MP
│       ├── productos/route.ts      # CRUD productos
│       └── auth/
│           ├── login/route.ts      # Login admin
│           └── logout/route.ts     # Logout admin
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   ├── ProductGrid.tsx
│   ├── CheckoutButton.tsx
│   └── WhatsAppButton.tsx
├── lib/
│   ├── supabase.ts                 # Cliente Supabase
│   └── mercadopago.ts              # Cliente Mercado Pago
├── config/
│   └── store.ts                    # Configuración tienda
├── middleware.ts                   # Auth middleware
├── supabase-schema.sql             # Schema de base de datos
└── .env.example                    # Variables de entorno
```

---

## Usar como template para múltiples tiendas

Este proyecto está diseñado para ser clonado y reutilizado.

### Proceso para crear una nueva tienda

1. Clonar el repositorio
2. Editar `config/store.ts` con los datos del nuevo cliente
3. Crear nuevo proyecto Supabase
4. Ejecutar `supabase-schema.sql`
5. Configurar `.env.local` con nuevas credenciales
6. Deploy en Vercel
7. Entregar URL al cliente

**Tiempo estimado**: 20-30 minutos por tienda

---

## Roadmap futuro

### Fase 1 (MVP) - ✅ Completado
- Catálogo de productos
- Checkout con Mercado Pago
- WhatsApp integration
- Panel admin CRUD

### Fase 2 - Mejoras
- Carrito de compras
- Cupones de descuento
- Envíos
- Analytics

### Fase 3 - Multi-tenant
- Una plataforma con múltiples tiendas
- Subdominios por tienda
- Dashboard global

---

## Soporte

Para soporte o consultas sobre el template, abre un issue en el repositorio.

---

## Licencia

MIT License - Libre para uso comercial
