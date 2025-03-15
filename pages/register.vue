<template>
    <div class="min-h-screen bg-[#1a1c22] text-white flex items-center justify-center">
      <div class="bg-[#232830] p-8 rounded shadow-md w-full max-w-sm">
        <h1 class="text-2xl font-bold mb-4">Registro</h1>
        <form @submit.prevent="handleRegister">
          <div class="mb-4">
            <label class="block mb-1">Nombre</label>
            <input
              v-model="name"
              type="text"
              class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
              required
            />
          </div>
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
            Registrarme
          </button>
        </form>
        <p class="mt-4 text-sm text-center">
          ¿Ya tienes cuenta?
          <NuxtLink to="/login" class="text-blue-400">Inicia sesión</NuxtLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from '#imports'
  // No composable de register, haremos fetch directo
  const name = ref('')
  const email = ref('')
  const password = ref('')
  const router = useRouter()
  
  async function handleRegister() {
    try {
      await $fetch('/auth/register', {
        baseURL: API_BASE,
        method: 'POST',
        body: {
          name: name.value,
          email: email.value,
          password: password.value
        }
      })
      alert('Usuario registrado con éxito')
      router.push('/login')
    } catch (error) {
      alert('Error al registrar')
    }
  }
  </script>  