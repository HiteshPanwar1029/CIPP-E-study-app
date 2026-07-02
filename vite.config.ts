/// <reference types="vitest/config" />
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { PluginOption } from 'vite'

async function optionalPwa(): Promise<PluginOption[]> {
  try {
    const specifier = ['vite', 'plugin', 'pwa'].join('-')
    const { VitePWA } = await import(specifier)
    return VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'CIPP/E Prep',
        short_name: 'CIPP/E',
        description: 'Local-first, blueprint-aligned study tool for the IAPP CIPP/E exam.',
        theme_color: '#0f766e',
        background_color: '#faf9f7',
        display: 'standalone',
        start_url: '.',
        icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,woff2}'] },
    }) as PluginOption[]
  } catch {
    return []
  }
}

export default defineConfig(async () => ({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss(), ...(await optionalPwa())],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          recharts: ['recharts'],
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
  test: { environment: 'node', include: ['src/**/*.test.ts'] },
}))
