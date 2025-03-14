<template>
    <div class="flex h-screen bg-gray-900 text-white font-sans">
      <!-- Sidebar -->
      <div
        :class="[
          'w-64 bg-gray-900 border-r border-[#2c3e50] fixed left-0 top-0 h-screen z-10 transition-transform duration-300',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ]"
      >
        <div class="p-4 border-b border-[#2c3e50]">
          <div class="flex items-center space-x-3">
            <!-- Avatar del usuario -->
            <div
              class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-900 font-bold"
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
          <!-- Menú Principal -->
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
  
          <!-- Configuración -->
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
  
          <!-- Ayuda y comentarios -->
          <NuxtLink
            to="/ayuda"
            class="flex items-center px-4 py-3 text-white hover:bg-[#2c3e50] transition-colors"
          >
            <HelpCircle class="w-5 h-5 mr-3" />
            <span>Ayuda y comentarios</span>
          </NuxtLink>
        </div>
      </div>
  
      <!-- Main Content -->
      <div :class="[ 'flex-1 transition-all duration-300', isSidebarOpen ? 'ml-64' : 'ml-0' ]">
        <!-- Barra Superior -->
        <div class="flex justify-between items-center px-4 py-3 bg-[#1a1c22]">
          <div class="flex items-center space-x-4">
            <!-- Botón hamburguesa (del layout) -->
            <button
              @click="toggleSidebar"
              class="focus:outline-none hover:bg-[#2c3e50] p-1 rounded-md transition-colors"
            >
              <Menu class="w-6 h-6 text-white" />
            </button>
            <h1 class="text-2xl font-bold">Mi Aplicación</h1>
          </div>
        </div>
  
        <!-- Contenido de cada página -->
        <div class="p-6 bg-[#1a1c22] h-screen overflow-y-auto">
          <NuxtPage />
        </div>
      </div>
  
      <!-- Overlay (móvil) -->
      <div
        v-if="isSidebarOpen"
        @click="closeSidebar"
        class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
      ></div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Menu, ListTodo, Settings, HelpCircle } from 'lucide-vue-next'
  import { useAuth } from '~/composables/useAuth'
  import { useSidebar } from '~/composables/useSidebar'
  
  // Datos de usuario
  const { userName, userEmail, avatarColor } = useAuth()
  
  // Usamos el composable para el sidebar (variable global compartida)
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useSidebar()
  </script>
  
  <style scoped>
  /* Ajusta estilos si lo deseas */
  </style>  