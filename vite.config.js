import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  resolve: {
    alias: {
    '@': path.resolve(__dirname, './src'),
    '@common': path.resolve(__dirname, './src/common'),
    '@features': path.resolve(__dirname, './src/features'),
    '@domain': path.resolve(__dirname, './src/domain'),
    '@assets': path.resolve(__dirname, './src/assets'),
    '@utils': path.resolve(__dirname, './src/common/utils'),
    '@components': path.resolve(__dirname, './src/common/components')
    },
  },
})
