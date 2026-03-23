# Configuración de Supabase Storage para Imágenes

## Crear el bucket de almacenamiento

1. Ve a tu proyecto en [Supabase](https://supabase.com/dashboard)
2. Ve a **Storage** en el menú lateral
3. Haz clic en **New bucket**
4. Configura el bucket:
   - **Name**: `productos`
   - **Public bucket**: ✅ Activado (para que las imágenes sean públicas)
   - **File size limit**: 5MB (opcional)
   - **Allowed MIME types**: `image/jpeg, image/jpg, image/png, image/webp, image/gif` (opcional)
5. Haz clic en **Create bucket**

## Configurar políticas de acceso (RLS)

Por defecto, el bucket tiene Row Level Security habilitado. Necesitas crear políticas para:

### 1. Permitir lectura pública (para que cualquiera vea las imágenes)

```sql
-- En el editor de políticas del bucket 'productos', crear política de SELECT:
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'productos');
```

O desde la interfaz de Supabase:
- Ve a **Storage** → **productos** → **Policies**
- Clic en **New Policy**
- Selecciona **For full customization**
- **Policy name**: `Public Access`
- **Allowed operation**: `SELECT`
- **Target roles**: `public`
- **USING expression**: `bucket_id = 'productos'`

### 2. Permitir subida (INSERT) solo desde el backend

No es necesario crear política INSERT porque estamos usando `supabaseAdmin` (service_role) en el endpoint `/api/upload`, que bypasea RLS.

## Verificar configuración

1. Ve a **Storage** → **productos**
2. Verifica que el bucket sea público
3. Prueba subir una imagen desde el panel de admin de tu app

## Estructura de archivos

Las imágenes se guardan en:
```
productos/
  └── images/
      ├── 1234567890-abc123.jpg
      ├── 1234567891-def456.png
      └── ...
```

## URL pública de las imágenes

Las imágenes subidas tendrán URLs como:
```
https://[tu-proyecto].supabase.co/storage/v1/object/public/productos/images/[nombre-archivo]
```

## Troubleshooting

### Error: "new row violates row-level security policy"
- Asegúrate de que el endpoint use `supabaseAdmin` (no `supabase`)
- Verifica que la service_role key esté configurada en `.env.local`

### Error: "Bucket not found"
- Verifica que el bucket se llame exactamente `productos`
- Recrea el bucket si es necesario

### Las imágenes no se ven
- Verifica que el bucket sea **público**
- Verifica que la política de SELECT permita acceso público
- Inspecciona la URL en el navegador para ver el error exacto
