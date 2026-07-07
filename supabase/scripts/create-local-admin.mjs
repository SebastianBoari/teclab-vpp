import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'

const ENV_FILE_PATH = path.resolve('supabase/.env.local')

function loadLocalEnvFile() {
  if (!fs.existsSync(ENV_FILE_PATH)) return

  const fileContent = fs.readFileSync(ENV_FILE_PATH, 'utf8')

  fileContent
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .forEach((line) => {
      const [key, ...valueParts] = line.split('=')
      const value = valueParts.join('=').trim()

      if (!process.env[key]) {
        process.env[key] = value
      }
    })
}

loadLocalEnvFile()

const SUPABASE_URL = process.env.SUPABASE_URL || 'http://127.0.0.1:54321'

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const ADMIN_EMAIL = process.env.LOCAL_ADMIN_EMAIL || 'admin@local.test'

const ADMIN_PASSWORD = process.env.LOCAL_ADMIN_PASSWORD || 'admin123456'

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Falta SUPABASE_SERVICE_ROLE_KEY. Creá supabase/.env.local con esa variable.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function waitForAuthService(maxAttempts = 20) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const { data, error } = await supabase.auth.admin.listUsers()

    if (!error) {
      return data.users
    }

    console.log(`Esperando Auth local... intento ${attempt}/${maxAttempts}`)
    await wait(1500)
  }

  throw new Error('Auth local no respondió a tiempo.')
}

try {
  const users = await waitForAuthService()

  const existingUser = users.find((user) => user.email === ADMIN_EMAIL)

  if (existingUser) {
    const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.id, {
      password: ADMIN_PASSWORD,
      email_confirm: true,
    })

    if (updateError) {
      throw updateError
    }

    console.log(`Admin local actualizado: ${ADMIN_EMAIL}`)
    process.exit(0)
  }

  const { error: createError } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  })

  if (createError) {
    throw createError
  }

  console.log(`Admin local creado: ${ADMIN_EMAIL}`)
} catch (error) {
  console.error('Error creando admin local:', error.message || error)
  process.exit(1)
}
