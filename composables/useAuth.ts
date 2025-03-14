import { ref, onMounted } from 'vue'

const token = ref<string | null>(null)
const userName = ref<string | null>(null)
const userEmail = ref<string | null>(null)
const avatarColor = ref<string | null>(null)

export function useAuth() {
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
      const response = await $fetch<{
        token: string
        userName: string
        userEmail: string
        color: string
      }>('/auth/login', {
        baseURL: 'http://localhost:4500',
        method: 'POST',
        body: { email, password }
      })

      // Asignamos los datos recibidos
      token.value = response.token
      userName.value = response.userName
      userEmail.value = response.userEmail
      avatarColor.value = response.color

      // Guardamos en localStorage
      if (process.client) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('userName', response.userName)
        localStorage.setItem('userEmail', response.userEmail)
        localStorage.setItem('userColor', response.color)
      }
    } catch (error) {
      // Aquí podrías manejar el error como gustes
      throw error
    }
  }

  function logout() {
    token.value = null
    userName.value = null
    userEmail.value = null
    avatarColor.value = null  // Limpieza local de la variable

    if (process.client) {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userColor') // Importante: limpiar también el color
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