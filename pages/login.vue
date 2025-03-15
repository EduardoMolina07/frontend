<template>
  <div class="min-h-screen bg-[#1a1c22] text-white flex items-center justify-center">
    <div class="bg-[#232830] p-8 rounded shadow-md w-full max-w-sm">
      <h1 class="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label class="block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block mb-1">Contraseña</label>
          <input
            v-model="password"
            type="password"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            required
          />
        </div>
        <button
          type="submit"
          class="bg-[#2c3e50] w-full py-2 rounded hover:bg-[#1a2530] transition-colors"
        >
          Entrar
        </button>
      </form>
      <p class="mt-4 text-sm text-center">
        ¿No tienes cuenta?
        <NuxtLink to="/register" class="text-blue-500">Regístrate aquí</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from '#imports'

const email = ref('')
const password = ref('')
const { login } = useAuth()
const router = useRouter()

async function handleLogin() {
  try {
    await login(email.value, password.value)
    router.push('/') // Ir a la página principal
  } catch (error) {
    alert('Credenciales inválidas')
  }
}
</script>