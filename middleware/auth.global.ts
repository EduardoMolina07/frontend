export default defineNuxtRouteMiddleware((to, from) => {
  const { token } = useAuth()

  // 1) Si NO hay token y NO voy a /login ni /register => me manda a /login
  if (!token.value && to.path !== '/login' && to.path !== '/register') {
    return navigateTo('/login')
  }

  // 2) Si SÍ hay token y estoy intentando ir a /login o /register => me manda a /
  if (token.value && (to.path === '/login' || to.path === '/register')) {
    return navigateTo('/')
  }
})