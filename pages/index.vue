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
          <!-- Círculo con la inicial -->
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
    <div 
      :class="[
        'flex-1 transition-all duration-300', 
        isSidebarOpen ? 'ml-64' : 'ml-0'
      ]"
    >
      <!-- Barra Superior -->
      <div class="flex justify-between items-center px-4 py-3 bg-[#1a1c22]">
        <div class="flex items-center space-x-4">
          <!-- Botón hamburguesa -->
          <button 
            @click="toggleSidebar"
            class="focus:outline-none hover:bg-[#2c3e50] p-1 rounded-md transition-colors"
          >
            <Menu class="w-6 h-6" />
          </button>
          <!-- Mes actual + Dropdown -->
          <div class="flex items-center relative">
            <span class="text-2xl font-medium capitalize">
              {{ currentMonthName }}
            </span>
            <button 
              @click="toggleMonthDropdown" 
              class="ml-1 p-1 rounded hover:bg-[#2c3e50]"
            >
              <ChevronDown class="w-5 h-5" />
            </button>
            <!-- Dropdown de meses -->
            <div 
              v-if="showMonthDropdown" 
              class="absolute top-8 left-0 bg-[#232830] p-2 rounded shadow z-20"
            >
              <div 
                v-for="(m, i) in months" 
                :key="m" 
                class="px-4 py-2 hover:bg-[#2c3e50] cursor-pointer capitalize"
                @click="selectMonth(i)"
              >
                {{ m }}
              </div>
            </div>
          </div>
        </div>

        <!-- Lupa + Día real -->
        <div class="flex items-center space-x-2">
          <div class="flex items-center space-x-2">
            <button 
              @click="toggleSearch" 
              class="p-1 rounded hover:bg-[#2c3e50]"
            >
              <Search class="w-6 h-6" />
            </button>
            <!-- Input de búsqueda -->
            <input
              v-if="showSearch"
              v-model="searchQuery"
              type="text"
              placeholder="Buscar eventos..."
              class="bg-[#232830] text-white p-2 rounded w-64"
            />
          </div>
          <!-- Botón para ir al día real -->
          <div 
            class="relative w-8 h-8 flex items-center justify-center border border-white rounded cursor-pointer text-lg"
            @click="scrollToRealDay"
          >
            <span class="text-sm font-bold">
              {{ realDay }}
            </span>
          </div>
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="bg-[#1a1c22] pb-4 h-screen overflow-y-auto">
        <!-- Vista de resultados si searchQuery -->
        <div v-if="searchQuery.trim() !== ''" class="px-4 pt-4">
          <h2 class="text-[#8b93a8] text-lg mb-4">
            Resultados de la búsqueda
          </h2>
          <div 
            v-for="evt in filteredEvents" 
            :key="evt.id" 
            class="flex items-start mb-4"
          >
            <div
              class="bg-gradient-to-r from-[#3a1c71] via-[#d76d77] to-[#ffaf7b] 
                     rounded-xl w-full overflow-hidden shadow-lg 
                     transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
            >
              <div class="relative p-4">
                <div class="flex items-center mb-1">
                  <div class="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <Gift class="w-5 h-5 text-white" />
                  </div>
                  <h3 class="text-xl font-bold text-white mr-2">
                    {{ evt.title }}
                  </h3>
                </div>
                <p v-if="evt.description" class="text-white text-sm">
                  {{ evt.description }}
                </p>
                <p v-if="evt.location" class="text-white text-sm mt-1">
                  <strong>Ubicación:</strong> {{ evt.location }}
                </p>
                <p class="text-white text-xs mt-1">
                  {{ formatTime(evt.date) }} - {{ formatDate(evt.date) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Vista Normal (Grid de calendario) si no hay búsqueda -->
        <div 
          v-else 
          class="px-4 pt-4"
          ref="daysContainer"
        >
          <!-- Encabezado de días de la semana -->
          <div 
            class="grid grid-cols-7 gap-2 text-center text-sm text-[#8b93a8] font-medium mb-2"
          >
            <div v-for="d in daysOfWeek" :key="d">
              {{ d }}
            </div>
          </div>

          <!-- Grid de días del mes -->
          <div class="grid grid-cols-7 gap-2">
            <!-- Celdas vacías para alinear el primer día -->
            <div
              v-for="n in firstDayOffset"
              :key="'empty-' + n"
              class="h-24"
            ></div>

            <!-- Celdas para cada día -->
            <div
              v-for="day in getDaysInMonth()"
              :key="day"
              :id="'day-' + day"
              class="h-24 bg-[#232830] rounded-lg relative p-1"
            >
              <!-- Número del día -->
              <div class="absolute top-2 left-2 text-sm font-semibold text-white">
                {{ day }}
              </div>

              <!-- Eventos de este día -->
              <div class="mt-6 space-y-1">
                <div
                  v-for="ev in eventsForGridDay(day)"
                  :key="ev.id"
                  class="bg-blue-600 text-white text-xs rounded px-1 py-0.5"
                >
                  {{ ev.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay (móvil) -->
    <div 
      v-if="isSidebarOpen" 
      @click="closeSidebar"
      class="md:hidden fixed inset-0 bg-black bg-opacity-50 z-0"
    ></div>

    <!-- Botón Agregar Evento (flotante) -->
    <button
      class="fixed bottom-6 right-6 px-6 py-4 bg-[#2c3e50] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1a2530] transition-colors"
      @click="openModal"
    >
      <Plus class="w-8 h-8 text-white mr-2" />
      <span class="text-white font-medium text-lg">
        Agregar evento
      </span>
    </button>

    <!-- Modal para crear evento -->
    <AddEventModal 
      v-if="showModal" 
      @close="closeModal" 
      @created="handleCreated" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import {
  Menu, Search, Gift, ListTodo, HelpCircle,
  Settings, Plus, ChevronDown
} from 'lucide-vue-next'

import AddEventModal from '~/components/AddEventModal.vue'
import { useAuth } from '~/composables/useAuth'
import { useEvents } from '~/composables/useEvents'

// ================== AUTH / SIDEBAR ==================
const { userName, userEmail, avatarColor } = useAuth()

// Controla la apertura/cierre del sidebar
const isSidebarOpen = ref(true)
function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
function closeSidebar() {
  isSidebarOpen.value = false
}

// ================== MODAL ==================
const showModal = ref(false)
function openModal() {
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
function handleCreated(evt: any) {
  console.log('Evento creado:', evt)
}

// ================== FECHAS REALES ==================
const todayDate = new Date()
const realDay = todayDate.getDate()
const realMonth = todayDate.getMonth()
const realYear = todayDate.getFullYear()

// ================== BÚSQUEDA ==================
const showSearch = ref(false)
const searchQuery = ref('')
function toggleSearch() {
  showSearch.value = !showSearch.value
}

// ================== CALENDARIO ==================
const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const months = [
  'enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre'
]

const showMonthDropdown = ref(false)
function toggleMonthDropdown() {
  showMonthDropdown.value = !showMonthDropdown.value
}
const currentMonth = ref(realMonth)
const currentYear = ref(realYear)
const currentMonthName = computed(() => months[currentMonth.value])

function selectMonth(i: number) {
  currentMonth.value = i
  showMonthDropdown.value = false
  // Opcional: scroll al día 1
  nextTick(() => {
    const el = document.getElementById('day-1')
    el?.scrollIntoView({ behavior: 'smooth' })
  })
}

// ================== EVENTOS (useEvents) ==================
const { events } = useEvents()

// Vista global (ordenada)
const allEvents = computed(() => {
  return events.value.slice().sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  )
})
// Filtrados según searchQuery
const filteredEvents = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return []
  return allEvents.value.filter(e =>
    e.title.toLowerCase().includes(q) ||
    (e.description && e.description.toLowerCase().includes(q))
  )
})

// ========== LÓGICA GRID ==========

// Cantidad de días del mes actual
function getDaysInMonth() {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
}

// offset para el primer día (0=Dom, 1=Lun, etc.)
const firstDayOffset = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay()
})

// Eventos para un día en la grid
function eventsForGridDay(day: number) {
  return events.value.filter(ev => {
    const d = new Date(ev.date)
    return (
      d.getDate() === day &&
      d.getMonth() === currentMonth.value &&
      d.getFullYear() === currentYear.value
    )
  })
}

// ========== HELPERS FECHA/HORA ==========
function formatTime(dateString: string) {
  const d = new Date(dateString)
  return d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
}
function formatDate(dateString: string) {
  const d = new Date(dateString)
  return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Scroll al día real
function scrollToRealDay() {
  currentMonth.value = realMonth
  currentYear.value = realYear
}

// Montado
onMounted(() => {
  // Aquí podrías hacer algo adicional si lo requieres.
})
</script>

<style scoped>
/* Ajusta si deseas cambiar algún color o tamaño extra */
</style>