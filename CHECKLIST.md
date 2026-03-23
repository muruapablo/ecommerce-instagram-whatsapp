# ✅ Checklist de Setup - Ecommerce Template

Usa este checklist para configurar rápidamente una nueva tienda.

---

## 📦 1. Instalación inicial

- [ ] Clonar o copiar el repositorio
- [ ] Ejecutar `npm install`
- [ ] Copiar `.env.example` a `.env.local`

---

## 🗄️ 2. Configurar Supabase

### Crear proyecto
- [ ] Crear proyecto en [supabase.com](https://supabase.com)
- [ ] Copiar URL del proyecto
- [ ] Copiar Anon Key (Settings → API)
- [ ] Copiar Service Role Key (Settings → API)

### Configurar base de datos
- [ ] Ir a SQL Editor en Supabase
- [ ] Copiar contenido de `supabase-schema.sql`
- [ ] Ejecutar el SQL

### Configurar Storage (para imágenes)
- [ ] Ir a **Storage** en Supabase
- [ ] Crear bucket llamado `productos`
- [ ] ✅ Marcar "Public bucket" = ACTIVADO
- [ ] Ir a **Policies** del bucket
- [ ] Crear política de lectura pública:
  ```sql
  CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'productos');
  ```

### Agregar a .env.local
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

---

## 💳 3. Configurar Mercado Pago

- [ ] Crear cuenta en [mercadopago.com](https://www.mercadopago.com.ar)
- [ ] Ir a **Tus integraciones** → **Credenciales**
- [ ] Copiar Access Token (usar **TEST** para desarrollo)

### Agregar a .env.local
```env
MERCADOPAGO_ACCESS_TOKEN=TEST-1234567890-...
```

---

## 🔐 4. Configurar credenciales de Admin

### Agregar a .env.local
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro_aqui
```

---

## 🏪 5. Configurar datos de la tienda

- [ ] Editar `config/store.ts` con:
  - Nombre de la tienda
  - WhatsApp (formato: 5493510000000)
  - Instagram username
  - Logo
  - Colores
  - Moneda

---

## 🚀 6. Probar localmente

- [ ] Ejecutar `npm run dev`
- [ ] Abrir [http://localhost:3000](http://localhost:3000)
- [ ] Ir a [/admin/login](http://localhost:3000/admin/login)
- [ ] Crear producto de prueba
  - Probar subir imagen desde dispositivo
  - Probar URL de imagen externa
- [ ] Verificar que aparezca en el home

---

## 🌐 7. Deploy (opcional)

### Preparar repositorio
- [ ] Inicializar Git: `git init`
- [ ] Commit: `git add . && git commit -m "Initial commit"`
- [ ] Push a GitHub

### Deploy en Vercel
- [ ] Crear cuenta en [vercel.com](https://vercel.com)
- [ ] Importar repositorio
- [ ] Configurar variables de entorno (todas las de .env.local)
- [ ] Cambiar `NEXT_PUBLIC_APP_URL` a tu dominio de Vercel
- [ ] Deploy

### Configurar webhook de Mercado Pago
- [ ] Ir a Mercado Pago → **Tus integraciones** → **Webhooks**
- [ ] Agregar: `https://tu-dominio.vercel.app/api/webhook`
- [ ] Seleccionar evento: **Pagos**

---

## ✨ 8. Verificación final

- [ ] La tienda carga correctamente
- [ ] Puedes ver los productos
- [ ] Botón de WhatsApp funciona
- [ ] Checkout redirige a Mercado Pago
- [ ] Panel admin es accesible
- [ ] Puedes crear/editar/eliminar productos
- [ ] Puedes subir imágenes desde dispositivo

---

## 🔧 Troubleshooting

### Error: "Bucket not found"
→ Asegúrate de crear el bucket `productos` en Supabase Storage

### Error: "Row level security policy"
→ Verifica que `SUPABASE_SERVICE_ROLE_KEY` esté en `.env.local`

### Las imágenes no se ven
→ Verifica que el bucket sea público y tenga la política de SELECT

### No puedo login al admin
→ Verifica `ADMIN_USERNAME` y `ADMIN_PASSWORD` en `.env.local`

---

## 📚 Documentación completa

- [SETUP.md](./SETUP.md) - Instalación detallada
- [DEPLOY.md](./DEPLOY.md) - Configuración de deployment
- [QUICKSTART.md](./QUICKSTART.md) - Guía rápida
- [SUPABASE_STORAGE_SETUP.md](./SUPABASE_STORAGE_SETUP.md) - Detalles de Storage
