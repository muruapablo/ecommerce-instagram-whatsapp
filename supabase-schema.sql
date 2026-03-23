-- ================================================
-- SCHEMA SUPABASE - ECOMMERCE TEMPLATE
-- ================================================
-- Este archivo debe ejecutarse en Supabase SQL Editor
-- para crear las tablas de la base de datos

-- Habilitar extensión UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================
-- TABLA: productos
-- ================================================
CREATE TABLE productos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
  descripcion TEXT,
  imagen TEXT,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  activo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_productos_slug ON productos(slug);
CREATE INDEX idx_productos_activo ON productos(activo);
CREATE INDEX idx_productos_created_at ON productos(created_at DESC);

-- ================================================
-- TABLA: pedidos
-- ================================================
CREATE TABLE pedidos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  producto_id UUID NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_total NUMERIC(10, 2) NOT NULL CHECK (precio_total >= 0),
  estado TEXT NOT NULL CHECK (estado IN ('pendiente', 'pagado', 'cancelado')),
  mercadopago_payment_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_pedidos_producto_id ON pedidos(producto_id);
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_pedidos_created_at ON pedidos(created_at DESC);
CREATE INDEX idx_pedidos_mercadopago_payment_id ON pedidos(mercadopago_payment_id);

-- ================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================
-- Habilitar RLS en las tablas
ALTER TABLE productos ENABLE ROW LEVEL SECURITY;
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

-- Políticas para productos (lectura pública, escritura solo admin)
CREATE POLICY "Productos son visibles para todos"
  ON productos FOR SELECT
  USING (true);

CREATE POLICY "Solo admin puede insertar productos"
  ON productos FOR INSERT
  WITH CHECK (false); -- Deshabilitado por defecto, usar service_role para admin

CREATE POLICY "Solo admin puede actualizar productos"
  ON productos FOR UPDATE
  USING (false);

CREATE POLICY "Solo admin puede eliminar productos"
  ON productos FOR DELETE
  USING (false);

-- Políticas para pedidos (solo escritura desde API)
CREATE POLICY "Pedidos no son públicos"
  ON pedidos FOR SELECT
  USING (false);

CREATE POLICY "Solo API puede crear pedidos"
  ON pedidos FOR INSERT
  WITH CHECK (false); -- Usar service_role desde API

CREATE POLICY "Solo API puede actualizar pedidos"
  ON pedidos FOR UPDATE
  USING (false);

-- ================================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ================================================
-- Descomentar para insertar productos de prueba

/*
INSERT INTO productos (nombre, slug, precio, descripcion, imagen, stock, activo) VALUES
  (
    'Producto Ejemplo 1',
    'producto-ejemplo-1',
    9999.99,
    'Este es un producto de ejemplo para probar el ecommerce. Puedes editarlo desde el panel de administración.',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    10,
    true
  ),
  (
    'Producto Ejemplo 2',
    'producto-ejemplo-2',
    5999.00,
    'Otro producto de ejemplo con una descripción más larga para ver cómo se visualiza en la tienda.',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    5,
    true
  ),
  (
    'Producto Ejemplo 3',
    'producto-ejemplo-3',
    15999.50,
    'Tercer producto de ejemplo. Recuerda actualizar las imágenes y descripciones reales.',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
    3,
    true
  );
*/

-- ================================================
-- COMENTARIOS
-- ================================================
COMMENT ON TABLE productos IS 'Tabla de productos del ecommerce';
COMMENT ON TABLE pedidos IS 'Tabla de pedidos/compras realizadas';

COMMENT ON COLUMN productos.slug IS 'URL-friendly identifier para el producto';
COMMENT ON COLUMN productos.activo IS 'Si está en false, el producto no se muestra en la tienda';
COMMENT ON COLUMN pedidos.estado IS 'Estados posibles: pendiente, pagado, cancelado';
COMMENT ON COLUMN pedidos.mercadopago_payment_id IS 'ID del pago en Mercado Pago';
