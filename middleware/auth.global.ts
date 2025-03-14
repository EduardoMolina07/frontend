import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = useAuth()

  // Caso A: NO hay token => permitir solo /login y /register
  if (!token.value) {
    if (to.path !== '/login' && to.path !== '/register') {
      return navigateTo('/login')
    }
  } else {
    // Caso B: SÍ hay token => bloquear /login y /register
    if (to.path === '/login' || to.path === '/register') {
      return navigateTo('/')
    }
  }
})