import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      // npm run build
      open: true,
      filename: './dist/stats.html',
      template: 'sunburst'
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules')) {
            const module = id.split('node_modules/').pop()?.split('/')[0]
            return `vendor-${module}`
          }
        }
      }
    }
  }
})
