# Social Ecommerce Template
Ecommerce optimizado para vender desde Instagram y WhatsApp.

Este proyecto está pensado como:

1. Tienda individual (MVP)
2. Template clonable para múltiples clientes
3. Escalabilidad futura a plataforma multi-tienda

Stack moderno y económico para validar negocio sin costos de infraestructura.

---

# Objetivo del proyecto

Crear una tienda online simple para emprendedores que venden desde:

- Instagram
- WhatsApp Business

Con capacidad de:

- mostrar productos
- cobrar con Mercado Pago
- gestionar productos desde un panel admin
- escalar el proyecto a múltiples tiendas

---

# Stack tecnológico

Frontend

Next.js

Backend / Base de datos

Supabase

Pagos

Mercado Pago

Hosting

Vercel

---

# Infraestructura gratuita

El proyecto está diseñado para comenzar sin costos.

Hosting

Vercel free plan

Base de datos

Supabase free plan

Pagos

Mercado Pago (solo comisión por venta)

Costo inicial:

$0

---

# Arquitectura general

Cliente

↓

Instagram / WhatsApp

↓

Landing Ecommerce

↓

Next.js frontend

↓

API routes

↓

Mercado Pago checkout

↓

Webhook

↓

Supabase database

---

# Flujo de compra

1 Usuario descubre producto

Instagram post o historia

↓

link en bio

↓

tienda online

---

2 Usuario entra a producto

Visualiza

- foto
- precio
- descripción

---

3 Opciones

Comprar

o

Consultar por WhatsApp

---

4 Pago

Usuario paga con Mercado Pago.

---

5 Confirmación

Webhook registra el pedido en base de datos.

---

# Base de datos

Tabla productos

id uuid

nombre text

slug text

precio numeric

descripcion text

imagen text

stock integer

activo boolean

created_at timestamp

---

Tabla pedidos

id uuid

producto_id uuid

cantidad integer

precio_total numeric

estado text

created_at timestamp

Estados posibles

pendiente

pagado

cancelado

---

# Panel administrador

Ruta

/admin

El dueño de la tienda puede gestionar productos sin tocar código.

Funcionalidades

ABM de productos

Alta  
Baja  
Modificación

---

Vista productos

/admin/productos

Ejemplo

Producto  
Precio  
Stock  

Editar  
Eliminar

---

Crear producto

/admin/productos/nuevo

Campos

Nombre

Slug

Precio

Descripción

Imagen

Stock

Activo

---

# Integración WhatsApp

Cada producto tiene botón de consulta.

Link dinámico

https://wa.me/{numero}?text=Hola quiero consultar por {producto}

Esto genera alto porcentaje de conversión.

---

# Integración Mercado Pago

Endpoint

/api/checkout

Se crea preferencia de pago con:

producto

precio

cantidad

Usuario es redirigido al checkout de Mercado Pago.

---

# Webhook pagos

Endpoint

/api/webhook

Cuando el pago es aprobado:

guardar pedido en base de datos.

---

# Estructura del proyecto

/app

page.tsx

/producto/[slug]

/admin

/admin/login

/admin/productos

/admin/productos/nuevo

/api

/api/checkout

/api/webhook

/components

ProductCard

ProductGrid

CheckoutButton

WhatsAppButton

Navbar

/lib

supabase.ts

mercadopago.ts

/config

store.ts

---

# Archivo de configuración de tienda

config/store.ts

Permite reutilizar el template para distintos negocios.

Ejemplo

export const store = {

name: "Mi Tienda",

whatsapp: "549351XXXXXXX",

instagram: "mitienda",

logo: "/logo.png",

primaryColor: "#000000"

}

---

# Deploy

1 Subir repo a GitHub

2 Conectar con Vercel

3 Deploy automático

Resultado

tienda.vercel.app

---

# Estrategia de template clonable

Este proyecto se usará como template.

Cada tienda será un clon del repositorio.

Flujo de trabajo

git clone ecommerce-template

↓

configurar store.ts

↓

deploy en Vercel

↓

entregar al cliente

---

# Creación rápida de nuevas tiendas

Proceso estimado

30 minutos

1 Clonar repositorio

2 Cambiar branding

3 Configurar datos

4 Deploy

5 Entregar URL al cliente

---

# Modelo de negocio

Venta de tiendas para emprendedores.

Servicio

"Tu tienda para vender desde Instagram"

Incluye

- setup tienda
- carga inicial productos
- conexión Mercado Pago

Precio sugerido

150 – 300 USD

---

# Suscripción opcional

Hosting

Soporte

Actualizaciones

10 – 25 USD / mes

---

# Estrategia de validación

Primero validar mercado con pocas tiendas.

Fase 1

1 – 3 tiendas

infraestructura gratis

validar demanda

---

Fase 2

5 – 10 tiendas

automatizar template

---

Fase 3

SaaS multi-tienda

una plataforma con múltiples comercios.

---

# Escalabilidad futura (multi-tenant)

En el futuro el proyecto puede evolucionar a arquitectura multi-tienda.

Nueva tabla

tiendas

id uuid

nombre text

slug text

whatsapp text

logo text

color text

created_at timestamp

---

Productos pasarían a tener

tienda_id

---

URLs por tienda

tienda1.dominio.com

tienda2.dominio.com

tienda3.dominio.com

---

Esto permite tener cientos de tiendas con un solo sistema.

---

# Ventajas de este modelo

Infraestructura gratis

Rápido de lanzar

Escalable

Ideal para emprendedores que venden desde redes sociales

---

# Roadmap futuro

Mejoras posibles

carrito de compras

cupones

envíos

pixel Meta

analytics

email marketing

panel pedidos

notificaciones WhatsApp

---

# Objetivo final

Construir una plataforma tipo:

"Shopify para vender desde Instagram y WhatsApp"