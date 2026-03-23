# Open Graph Setup - Instagram y WhatsApp

Los Open Graph tags ya están implementados en el proyecto. Ahora necesitas:

## 1. Crear imagen Open Graph

Crea una imagen llamada `og-image.jpg` en la carpeta `/public/`

### Especificaciones:
- **Dimensiones**: 1200 x 630 píxeles (requerido por Facebook/Instagram)
- **Formato**: JPG o PNG
- **Peso**: Menor a 8 MB (idealmente < 1 MB)
- **Contenido sugerido**:
  - Logo de la tienda
  - Nombre del negocio
  - Slogan o descripción corta
  - Colores de tu marca (rojo-negro)

### Herramientas para crear:
- Canva (gratis): https://canva.com → usa template "Facebook Post"
- Figma (gratis)
- Photoshop / GIMP

### Ejemplo de contenido:
```
┌────────────────────────────────────┐
│                                    │
│    [LOGO]                         │
│                                    │
│    BIKE MARKETPLACE               │
│    Tienda online para insumos     │
│    de bicicletas                  │
│                                    │
│    🚲 Productos de calidad         │
│    📱 Compra fácil por WhatsApp    │
│                                    │
└────────────────────────────────────┘
```

---

## 2. Configurar variable de entorno

Agrega a tu archivo `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=https://tutienda.com
```

Reemplaza `tutienda.com` con tu dominio real cuando despliegues a Vercel.

---

## 3. Verificar implementación

### Qué se implementó:

✅ **Layout principal** (`app/layout.tsx`):
- Meta tags globales
- Open Graph para sitio web
- Twitter Cards
- Keywords SEO

✅ **Página de producto** (`app/producto/[slug]/page.tsx`):
- Metadata dinámica por producto
- Open Graph type "product"
- Imagen del producto
- Precio y disponibilidad
- Twitter Cards grandes

✅ **Homepage** (`app/page.tsx`):
- Meta tags específicos de la home
- Open Graph compartible

✅ **Bio page** (`app/bio/page.tsx`):
- Meta tags para link in bio
- Optimizado para Instagram

---

## 4. Cómo se ve cuando compartes

### En WhatsApp:
Cuando compartas un link de producto (ej: `tutienda.com/producto/bicicleta-roja`):

```
┌─────────────────────────┐
│ [Imagen del producto]   │
│                         │
│ Bicicleta Roja         │
│ $45,000 - Bicicleta    │
│ de montaña profesional │
│                         │
│ tutienda.com           │
└─────────────────────────┘
```

### En Instagram Stories (Link sticker):
```
┌─────────────────────────┐
│ Bike Marketplace        │
│ [Vista previa atractiva]│
│ tutienda.com/bio       │
└─────────────────────────┘
```

---

## 5. Probar los Open Graph tags

### Herramientas para validar:

1. **Facebook Debugger** (para Instagram también):
   https://developers.facebook.com/tools/debug/
   
   - Pega tu URL
   - Click "Debug"
   - Verás cómo se ve el preview

2. **Twitter Card Validator**:
   https://cards-dev.twitter.com/validator
   
3. **LinkedIn Post Inspector**:
   https://www.linkedin.com/post-inspector/

### Proceso:
1. Despliega tu sitio a Vercel
2. Pega la URL en Facebook Debugger
3. Si hay errores, corrígelos y usa "Scrape Again"
4. Comparte en WhatsApp/Instagram para ver el resultado

---

## 6. Tips importantes

### Para Instagram:
- La bio solo permite **1 link**, por eso creamos `/bio`
- Cambia ese link cuando quieras promocionar productos específicos
- Usa herramientas como Linktree o tu propia `/bio` page

### Para WhatsApp:
- Los links de productos se compartirán automáticamente con imagen
- El botón "Consultar" ya genera links pre-formateados
- Los clientes verán la preview antes de abrir el link

### Para mejorar conversión:
- Actualiza la imagen OG cada temporada
- Usa imágenes de productos de alta calidad
- Las descripciones cortas funcionan mejor (150-200 caracteres)
- Testea distintas imágenes para ver cuál convierte mejor

---

## 7. Metadata implementada por página

| Página | Title | Type | Imagen |
|--------|-------|------|--------|
| Home | "Bike Marketplace - Tienda Online" | website | og-image.jpg |
| Producto | Nombre del producto | product | Imagen del producto |
| Bio | "Bike Marketplace - Link in Bio" | website | og-image.jpg |

---

## Próximos pasos opcionales

- [ ] Implementar Meta Pixel para tracking de conversiones
- [ ] Agregar JSON-LD schema para productos (SEO)
- [ ] Instagram Shopping API (requiere aprobación de Meta)
- [ ] UTM parameters para tracking de campañas
