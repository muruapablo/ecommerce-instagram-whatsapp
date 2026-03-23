// Test de conexión a Supabase
const { createClient } = require('@supabase/supabase-js')

// Leer variables de entorno
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('🔍 Testeando conexión a Supabase...\n')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Error: Faltan las variables de entorno')
  console.log('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✓' : '✗')
  process.exit(1)
}

console.log('✓ Variables de entorno encontradas')
console.log('  URL:', supabaseUrl)
console.log('  Key:', supabaseAnonKey.substring(0, 20) + '...\n')

// Crear cliente
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Intentar una consulta simple
async function testConnection() {
  try {
    // Intentar listar tablas (aunque no existan aún)
    const { data, error } = await supabase
      .from('productos')
      .select('count')
      .limit(1)
    
    if (error) {
      // Si el error es que la tabla no existe, la conexión es correcta
      if (error.message.includes('does not exist') || error.code === '42P01') {
        console.log('✅ Conexión exitosa!')
        console.log('⚠️  La tabla "productos" no existe aún')
        console.log('   → Ejecuta el SQL en Supabase para crearlas\n')
      } else {
        console.log('⚠️  Conexión establecida pero hay un error:')
        console.log('   ', error.message, '\n')
      }
    } else {
      console.log('✅ Conexión exitosa!')
      console.log('✅ Tabla "productos" existe\n')
    }
  } catch (err) {
    console.error('❌ Error de conexión:', err.message, '\n')
    process.exit(1)
  }
}

testConnection()
