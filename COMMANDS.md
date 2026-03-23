# Comandos Útiles

Guía rápida de comandos para trabajar con el proyecto.

---

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Ejecutar en modo producción local
npm run build
npm run start

# Limpiar cache de Next.js
rm -rf .next

# Verificar errores de TypeScript
npx tsc --noEmit

# Verificar errores de ESLint
npm run lint
```

---

## Git

```bash
# Inicializar repositorio
git init

# Ver estado
git status

# Agregar todos los cambios
git add .

# Hacer commit
git commit -m "Mensaje del commit"

# Crear y conectar a repositorio remoto
git remote add origin https://github.com/tu-usuario/tu-repo.git

# Push inicial
git push -u origin main

# Push subsecuente
git push

# Ver historial
git log --oneline

# Crear nueva rama
git checkout -b feature/nueva-funcionalidad

# Cambiar de rama
git checkout main
```

---

## NPM

```bash
# Ver versión de dependencias
npm list

# Ver dependencias desactualizadas
npm outdated

# Actualizar dependencias
npm update

# Actualizar Next.js
npm install next@latest react@latest react-dom@latest

# Actualizar TypeScript
npm install -D typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest

# Agregar nueva dependencia
npm install nombre-paquete

# Agregar dependencia de desarrollo
npm install -D nombre-paquete

# Remover dependencia
npm uninstall nombre-paquete

# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Auditar vulnerabilidades
npm audit

# Arreglar vulnerabilidades automáticamente
npm audit fix
```

---

## Supabase

```bash
# Ver tablas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

# Ver todos los productos
SELECT * FROM productos ORDER BY created_at DESC;

# Ver pedidos recientes
SELECT * FROM pedidos ORDER BY created_at DESC LIMIT 20;

# Contar productos activos
SELECT COUNT(*) FROM productos WHERE activo = true;

# Total de ventas
SELECT SUM(precio_total) as total, COUNT(*) as cantidad 
FROM pedidos 
WHERE estado = 'pagado';

# Productos más vendidos
SELECT p.nombre, COUNT(pe.id) as ventas
FROM productos p
LEFT JOIN pedidos pe ON p.id = pe.producto_id
WHERE pe.estado = 'pagado'
GROUP BY p.id, p.nombre
ORDER BY ventas DESC
LIMIT 10;

# Insertar producto de prueba
INSERT INTO productos (nombre, slug, precio, descripcion, imagen, stock, activo)
VALUES (
  'Producto de Prueba',
  'producto-prueba',
  9999.99,
  'Este es un producto de prueba',
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
  10,
  true
);

# Actualizar stock
UPDATE productos SET stock = 5 WHERE slug = 'producto-prueba';

# Eliminar producto
DELETE FROM productos WHERE slug = 'producto-prueba';

# Resetear tablas (¡CUIDADO! Borra todo)
TRUNCATE TABLE pedidos CASCADE;
TRUNCATE TABLE productos CASCADE;
```

---

## Vercel CLI

```bash
# Instalar Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy desde terminal
vercel

# Deploy a producción
vercel --prod

# Ver logs
vercel logs

# Ver lista de deployments
vercel ls

# Agregar variable de entorno
vercel env add NOMBRE_VARIABLE

# Remover deployment
vercel remove nombre-proyecto
```

---

## Testing local de Mercado Pago

```bash
# Instalar ngrok para exponer localhost
npm install -g ngrok

# Exponer puerto 3000
ngrok http 3000

# Copiar la URL HTTPS generada
# Ejemplo: https://abc123.ngrok.io

# Configurar webhook en Mercado Pago
# URL: https://abc123.ngrok.io/api/webhook
```

---

## Comandos útiles del proyecto

```bash
# Ver estructura de archivos
tree -I 'node_modules|.next|.git' -L 3

# O en Windows con PowerShell
Get-ChildItem -Recurse -Exclude node_modules,.next,.git | Select-Object FullName

# Buscar en archivos
grep -r "texto" app/

# Contar líneas de código
find . -name '*.ts' -o -name '*.tsx' | xargs wc -l

# Ver tamaño de carpetas
du -sh * | sort -h

# Verificar puerto 3000 disponible
lsof -i :3000

# Matar proceso en puerto 3000 (si está ocupado)
kill -9 $(lsof -t -i:3000)
```

---

## Docker (opcional)

Si quieres dockerizar el proyecto:

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Construir imagen
docker build -t ecommerce-template .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env.local ecommerce-template

# Ver contenedores
docker ps

# Parar contenedor
docker stop <container-id>
```

---

## Backup

```bash
# Backup de archivos
tar -czf backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.git \
  .

# Backup de base de datos Supabase
# Hacerlo desde el dashboard de Supabase:
# Database > Backups > Download

# Restaurar backup
tar -xzf backup-20240322.tar.gz
```

---

## Troubleshooting

```bash
# Limpiar todo y empezar de cero
rm -rf node_modules .next package-lock.json
npm install
npm run dev

# Ver errores detallados
NODE_OPTIONS='--inspect' npm run dev

# Verificar puertos en uso
netstat -ano | findstr :3000

# Verificar variables de entorno cargadas
node -e "console.log(process.env)"

# Test de conexión a Supabase
curl -X GET \
  'https://TU_URL.supabase.co/rest/v1/productos' \
  -H "apikey: TU_API_KEY" \
  -H "Authorization: Bearer TU_API_KEY"

# Test de webhook local
curl -X POST http://localhost:3000/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"type":"payment","data":{"id":"123456"}}'
```

---

## Productividad

```bash
# Crear alias útiles (agregar a .bashrc o .zshrc)
alias dev="npm run dev"
alias build="npm run build"
alias deploy="vercel --prod"
alias logs="vercel logs"

# Crear script de deploy automatizado
#!/bin/bash
git add .
git commit -m "Deploy $(date +%Y-%m-%d-%H:%M)"
git push
vercel --prod
```

---

## Monitoreo

```bash
# Ver logs en tiempo real (si usas PM2)
pm2 logs

# Ver uso de memoria
node --max-old-space-size=4096 npm run build

# Analizar bundle size
npm run build
# Luego revisar .next/analyze/

# Performance testing
npx lighthouse http://localhost:3000 --view
```

---

## Referencias rápidas

- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Mercado Pago: https://www.mercadopago.com.ar/developers
- TailwindCSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs
- Vercel: https://vercel.com/docs
