// composables/useAuth.ts
import { ref, onMounted } from 'vue'
// Importamos runtimeConfig desde '#imports' (Nuxt 3)
import { useRuntimeConfig } from '#imports'

const token = ref<string | null>(null)
const userName = ref<string | null>(null)
const userEmail = ref<string | null>(null)
const avatarColor = ref<string | null>(null)

export function useAuth() {
  // Obtenemos la config pública
  // (así, { public: { API_BASE } } = useRuntimeConfig())
  const { public: { API_BASE } } = useRuntimeConfig()

  onMounted(() => {
    if (process.client) {
      const savedToken = localStorage.getItem('token')
      const savedName = localStorage.getItem('userName')
      const savedEmail = localStorage.getItem('userEmail')
      const savedColor = localStorage.getItem('userColor')

      if (savedToken) token.value = savedToken
      if (savedName) userName.value = savedName
      if (savedEmail) userEmail.value = savedEmail
      if (savedColor) avatarColor.value = savedColor
    }
  })

  async function login(email: string, password: string) {
    try {
      // Usamos la variable API_BASE como baseURL
      const response = await $fetch<{
        token: string
        userName: string
        userEmail: string
        color: string
      }>('/auth/login', {
        baseURL: API_BASE, // ← aquí
        method: 'POST',
        body: { email, password }
      })

      token.value = response.token
      userName.value = response.userName
      userEmail.value = response.userEmail
      avatarColor.value = response.color

      if (process.client) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('userName', response.userName)
        localStorage.setItem('userEmail', response.userEmail)
        localStorage.setItem('userColor', response.color)
      }
    } catch (error) {
      // Manejo de error
      throw error
    }
  }

  function logout() {
    token.value = null
    userName.value = null
    userEmail.value = null
    avatarColor.value = null

    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userColor')
    }
  }

  return {
    token,
    userName,
    userEmail,
    avatarColor,
    login,
    logout
  }
}