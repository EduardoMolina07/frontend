// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      // Aquí, si no existe NUXT_API_BASE, usará 'http://localhost:4500' como fallback
      API_BASE: process.env.API_BASE || 'http://localhost:4500'
    }
  }
})
