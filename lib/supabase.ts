import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-role-key'

// Cliente público (con RLS)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Cliente admin (bypasea RLS) - Solo usar en server-side
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types for database tables
export interface Producto {
  id: string
  nombre: string
  slug: string
  precio: number
  descripcion: string
  imagen: string
  stock: number
  activo: boolean
  created_at: string
}

export interface Pedido {
  id: string
  producto_id: string
  cantidad: number
  precio_total: number
  estado: 'pendiente' | 'pagado' | 'cancelado'
  mercadopago_payment_id?: string
  created_at: string
}

// Database queries
export const getProductos = async (activoOnly = true) => {
  let query = supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false })

  if (activoOnly) {
    query = query.eq('activo', true)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Producto[]
}

export const getProductoBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('slug', slug)
    .eq('activo', true)
    .single()

  if (error) throw error
  return data as Producto
}

export const getProductoById = async (id: string) => {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Producto
}

export const createProducto = async (producto: Omit<Producto, 'id' | 'created_at'>) => {
  const { data, error } = await supabaseAdmin
    .from('productos')
    .insert([producto])
    .select()
    .single()

  if (error) throw error
  return data as Producto
}

export const updateProducto = async (id: string, producto: Partial<Producto>) => {
  const { data, error } = await supabaseAdmin
    .from('productos')
    .update(producto)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Producto
}

export const deleteProducto = async (id: string) => {
  const { error } = await supabaseAdmin
    .from('productos')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const createPedido = async (pedido: Omit<Pedido, 'id' | 'created_at'>) => {
  const { data, error } = await supabaseAdmin
    .from('pedidos')
    .insert([pedido])
    .select()
    .single()

  if (error) throw error
  return data as Pedido
}

export const updatePedido = async (id: string, pedido: Partial<Pedido>) => {
  const { data, error } = await supabaseAdmin
    .from('pedidos')
    .update(pedido)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Pedido
}
