# Quick Start Guide

## Para empezar a desarrollar

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# 3. Ejecutar en desarrollo
npm run dev

# 4. Abrir http://localhost:3000
```

## Credenciales necesarias

### Supabase
1. Crear cuenta en https://supabase.com
2. Crear nuevo proyecto
3. Ir a Settings > API
4. Copiar URL y anon key

### Mercado Pago
1. Crear cuenta en https://www.mercadopago.com.ar
2. Ir a Tus integraciones > Credenciales
3. Copiar Access Token (usar TEST para desarrollo)

### Configurar webhook de Mercado Pago
- Desarrollo: Usar ngrok (`ngrok http 3000`)
- Producción: URL de Vercel + `/api/webhook`

## Base de datos

```bash
# 1. Ir a Supabase SQL Editor
# 2. Abrir supabase-schema.sql
# 3. Copiar todo el contenido
# 4. Ejecutar en SQL Editor
```

## Configurar almacenamiento de imágenes (Storage)

Para poder subir imágenes desde el panel de admin:

1. Ve a **Storage** en Supabase
2. Crea un bucket llamado `productos` (público)
3. Configura las políticas de acceso

Ver instrucciones detalladas en [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md)

## Configuración de la tienda

Editar `config/store.ts`:
- Nombre de la tienda
- WhatsApp (formato: 5493510000000)
- Instagram username
- Colores y moneda

## Panel Admin

```
URL: http://localhost:3000/admin/login
Usuario: admin (configurado en .env.local)
Password: (configurado en .env.local)
```

## Deploy en Vercel

```bash
# 1. Push a GitHub
git add .
git commit -m "Initial commit"
git push

# 2. Ir a vercel.com
# 3. Importar repositorio
# 4. Configurar variables de entorno
# 5. Deploy
```

## Estructura de archivos

```
├── app/                    # Páginas Next.js
│   ├── page.tsx           # Home
│   ├── producto/[slug]/   # Detalle producto
│   ├── admin/             # Panel admin
│   └── api/               # API endpoints
├── components/            # Componentes UI
├── lib/                   # Integraciones
├── config/                # Configuración
└── supabase-schema.sql   # Schema de DB
```

## Documentación completa

- [README.md](./README.md) - Resumen del proyecto
- [SETUP.md](./SETUP.md) - Instalación detallada
- [DEPLOY.md](./DEPLOY.md) - Deploy y troubleshooting
- [COMMANDS.md](./COMMANDS.md) - Comandos útiles
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Resumen técnico

## Soporte

- Revisa los logs en Vercel
- Revisa los logs en Supabase
- Lee la documentación en los archivos .md
- Verifica las variables de entorno

## Checklist antes de lanzar

- [ ] Configurar credenciales de producción de Mercado Pago
- [ ] Cambiar contraseña de admin
- [ ] Configurar webhook de producción
- [ ] Probar flujo completo de compra
- [ ] Agregar productos reales
- [ ] Configurar dominio personalizado
- [ ] Probar en móvil
