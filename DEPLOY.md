# Guía de Deploy y Gestión

Esta guía cubre el proceso completo de deploy y gestión del ecommerce template.

---

## Deploy en Vercel (Recomendado)

### Paso 1: Preparar el repositorio

```bash
# Inicializar git si no existe
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Ecommerce template"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### Paso 2: Deploy en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "New Project"
3. Importa tu repositorio de GitHub
4. Configura el proyecto:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Paso 3: Configurar variables de entorno

En Vercel, ve a Settings > Environment Variables y agrega:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
MERCADOPAGO_ACCESS_TOKEN=tu_token
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro
NEXT_PUBLIC_APP_URL=https://tu-dominio.vercel.app
```

⚠️ **Importante**: 
- Asegúrate de configurar Supabase Storage (bucket `productos`) antes del deploy
- Usa credenciales de **PRODUCCIÓN** de Mercado Pago (no las de prueba)

### Paso 4: Deploy

Click en "Deploy" y espera a que termine el proceso.

---

## Configurar Webhook de Mercado Pago

### En desarrollo local (con ngrok)

1. Instala ngrok: `npm install -g ngrok`
2. Ejecuta: `ngrok http 3000`
3. Copia la URL HTTPS generada
4. Ve a Mercado Pago > Tus integraciones > Webhooks
5. Agrega: `https://tu-url-ngrok.ngrok.io/api/webhook`

### En producción (Vercel)

1. Ve a Mercado Pago > Tus integraciones > Webhooks
2. Agrega: `https://tu-dominio.vercel.app/api/webhook`
3. Selecciona el evento: **Pagos**

---

## Configurar dominio personalizado

### En Vercel

1. Ve a Settings > Domains
2. Agrega tu dominio (ej: `mitienda.com`)
3. Configura los DNS según las instrucciones de Vercel
4. Espera la propagación (puede tomar hasta 48 horas)
5. Actualiza `NEXT_PUBLIC_APP_URL` en las variables de entorno

---

## Gestión de productos

### Desde el panel admin

1. Accede a `tu-dominio.com/admin/login`
2. Ingresa con las credenciales configuradas
3. Ve a "Productos" en el menú

### Crear un producto

1. Click en "Nuevo Producto"
2. Completa el formulario:
   - **Nombre**: Nombre del producto
   - **Slug**: URL amigable (se genera automáticamente)
   - **Precio**: Precio en tu moneda local
   - **Stock**: Cantidad disponible
   - **Imagen**: URL de la imagen
   - **Descripción**: Descripción detallada
   - **Activo**: Si está visible en la tienda

3. Click en "Crear Producto"

### Editar un producto

1. En la lista de productos, click en "Editar"
2. Modifica los campos necesarios
3. Click en "Actualizar Producto"

### Eliminar un producto

1. En la lista de productos, click en "Eliminar"
2. Confirma la eliminación

---

## Gestión de imágenes

### Opciones recomendadas

1. **Unsplash** (gratis): `https://unsplash.com`
2. **Imgur** (gratis): `https://imgur.com`
3. **Cloudinary** (gratis hasta 25GB): `https://cloudinary.com`
4. **Supabase Storage**: Almacenamiento en tu proyecto Supabase

### Recomendaciones

- Tamaño: 800x800px mínimo
- Formato: JPG o WebP
- Peso: Menos de 200KB por imagen
- Relación de aspecto: 1:1 (cuadrada)

---

## Monitoreo de pedidos

Los pedidos se guardan en Supabase en la tabla `pedidos`.

### Ver pedidos en Supabase

1. Ve a tu proyecto en Supabase
2. Click en "Table Editor"
3. Selecciona la tabla "pedidos"
4. Verás todos los pedidos con sus estados:
   - `pendiente`: Pago iniciado pero no confirmado
   - `pagado`: Pago confirmado
   - `cancelado`: Pago rechazado o cancelado

### Query útil para reportes

```sql
-- Pedidos del último mes
SELECT 
  p.nombre as producto,
  pe.cantidad,
  pe.precio_total,
  pe.estado,
  pe.created_at
FROM pedidos pe
JOIN productos p ON pe.producto_id = p.id
WHERE pe.created_at > NOW() - INTERVAL '30 days'
ORDER BY pe.created_at DESC;

-- Total de ventas
SELECT 
  SUM(precio_total) as total_ventas,
  COUNT(*) as cantidad_pedidos
FROM pedidos
WHERE estado = 'pagado';
```

---

## Troubleshooting

### El webhook no funciona

1. Verifica que la URL del webhook en Mercado Pago sea correcta
2. Revisa los logs en Vercel > Deployments > Functions
3. Asegúrate de que `MERCADOPAGO_ACCESS_TOKEN` esté configurado

### Las imágenes no cargan

1. Verifica que la URL de la imagen sea accesible públicamente
2. Asegúrate de que la URL use HTTPS
3. Revisa la configuración de `next.config.js` para dominios remotos

### No puedo acceder al admin

1. Verifica que `ADMIN_USERNAME` y `ADMIN_PASSWORD` estén configurados
2. Borra las cookies del navegador
3. Intenta en una ventana de incógnito

### Los productos no aparecen

1. Verifica que los productos estén marcados como "activo"
2. Revisa la consola del navegador por errores
3. Verifica las credenciales de Supabase en `.env.local`

---

## Mantenimiento

### Actualizar dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas
npm update

# Actualizar Next.js específicamente
npm install next@latest react@latest react-dom@latest
```

### Backup de base de datos

En Supabase:
1. Ve a Database > Backups
2. Los backups automáticos se crean diariamente
3. Puedes hacer backups manuales cuando quieras

### Limpiar pedidos antiguos

```sql
-- Eliminar pedidos cancelados de hace más de 6 meses
DELETE FROM pedidos 
WHERE estado = 'cancelado' 
AND created_at < NOW() - INTERVAL '6 months';
```

---

## Escalabilidad

### Para manejar más tráfico

1. **Vercel Pro**: $20/mes por proyecto
   - Más recursos
   - Analytics incluido
   - Soporte prioritario

2. **Supabase Pro**: $25/mes por proyecto
   - 8GB database
   - 100GB bandwidth
   - Backups automáticos

3. **CDN para imágenes**:
   - Cloudinary
   - Cloudflare Images

### Migrar a multi-tenant

Cuando tengas múltiples tiendas, considera:

1. Agregar tabla `stores` en Supabase
2. Modificar tablas para incluir `store_id`
3. Implementar subdominios dinámicos
4. Panel super-admin para gestionar todas las tiendas

---

## Soporte

Si tienes problemas:

1. Revisa los logs en Vercel
2. Revisa los logs en Supabase
3. Abre un issue en GitHub
4. Consulta la documentación de Next.js, Supabase o Mercado Pago

---

## Checklist de lanzamiento

Antes de lanzar a producción:

- [ ] Cambiar credenciales de admin por defecto
- [ ] Configurar credenciales de producción de Mercado Pago
- [ ] Configurar webhook de producción
- [ ] Probar flujo completo de compra
- [ ] Configurar dominio personalizado
- [ ] Agregar productos reales con imágenes de calidad
- [ ] Verificar información de la tienda en `config/store.ts`
- [ ] Configurar políticas RLS en Supabase
- [ ] Hacer backup de base de datos
- [ ] Probar en dispositivos móviles
- [ ] Configurar Google Analytics (opcional)
- [ ] Configurar Meta Pixel (opcional)

---

## Recursos útiles

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Mercado Pago API](https://www.mercadopago.com.ar/developers)
- [Vercel Docs](https://vercel.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
