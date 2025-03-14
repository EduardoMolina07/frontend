<template>
  <div class="flex h-screen bg-[#1a1c22] text-white font-sans">
    <!-- Sidebar -->
    <div 
      :class="[
        'w-64 bg-gray-900 border-r border-[#2c3e50] fixed left-0 top-0 h-screen z-10 transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="p-4 border-b border-[#2c3e50]">
        <div class="flex items-center space-x-3">
          <!-- Círculo con la inicial (usa avatarColor para el fondo) -->
          <div 
            class="w-10 h-10 flex items-center justify-center rounded-full text-gray-900 font-bold"
            :style="{ backgroundColor: avatarColor || '#cccccc' }"
          >
            <span class="text-xl font-bold">
              {{ userName ? userName.charAt(0).toUpperCase() : 'U' }}
            </span>
          </div>
          <div>
            <h3 class="font-medium">{{ userName || 'Usuario' }}</h3>
            <p class="text-sm text-[#8b93a8]">{{ userEmail || '' }}</p>
          </div>
        </div>
      </div>

      <div class="py-4">
        <div class="px-4 py-2 text-[#8b93a8] text-xs font-medium uppercase tracking-wider">
          Menú Principal
        </div>
        <NuxtLink
          to="/mis-eventos"
          class="flex items-center px-4 py-3 text-white hover:bg-[#2c3e50] transition-colors"
        >
          <ListTodo class="w-5 h-5 mr-3" />
          <span>Mis Eventos</span>
        </NuxtLink>
        <div class="px-4 py-2 mt-4 text-[#8b93a8] text-xs font-medium uppercase tracking-wider">
          Configuración
        </div>
        <NuxtLink
          to="/configuracion"
          class="flex items-center px-4 py-3 text-white hover:bg-[#2c3e50] transition-colors"
        >
          <Settings class="w-6 h-6 mr-3" />
          <span>Configuración</span>
        </NuxtLink>
        <div class="flex items-center px-4 py-3 text-white hover:bg-[#2c3e50] transition-colors">
          <HelpCircle class="w-5 h-5 mr-3" />
          <span>Ayuda y comentarios</span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div :class="['flex-1 transition-all duration-300', isSidebarOpen ? 'ml-64' : 'ml-0']">
      <!-- Barra Superior -->
      <div class="flex justify-between items-center px-4 py-3 bg-[#1a1c22]">
        <div class="flex items-center space-x-4">
          <!-- Botón hamburguesa para mostrar/ocultar el sidebar -->
          <button 
            @click="toggleSidebar"
            class="focus:outline-none hover:bg-[#2c3e50] p-1 rounded-md transition-colors"
          >
            <Menu class="w-6 h-6" />
          </button>
          <h1 class="text-2xl font-bold">Configuración</h1>
        </div>
      </div>

      <!-- Contenido de Configuración -->
      <div class="p-6">
        <p>Aquí puedes agregar ajustes básicos (tema, idioma, notificaciones, etc.).</p>
        <div class="mt-4">
          <label class="block mb-2">Notificaciones</label>
          <select class="bg-[#232830] text-white p-2 rounded">
            <option value="on">Activadas</option>
            <option value="off">Desactivadas</option>
          </select>
        </div>
        <div class="mt-4">
          <label class="block mb-2">Idioma</label>
          <select class="bg-[#232830] text-white p-2 rounded">
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </select>
        </div>
        <button
          class="mt-6 bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
          @click="handleLogout"
        >
          Cerrar Sesión
        </button>
        <NuxtLink
          to="/"
          class="inline-block mt-6 ml-4 bg-[#2c3e50] px-4 py-2 rounded hover:bg-[#1a2530] transition-colors"
        >
          Volver
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useRouter } from '#imports'
import { Menu, ListTodo, Settings, HelpCircle } from 'lucide-vue-next'

const isSidebarOpen = ref(true) // Controla la visibilidad del sidebar
const { userName, userEmail, avatarColor, logout } = useAuth()
const router = useRouter()

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

function handleLogout() {
  logout()
  router.push('/login')
}
</script>

<style scoped>
/* Puedes ajustar estilos aquí si deseas modificar el look */
</style>
