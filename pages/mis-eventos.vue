<template>
  <div class="min-h-screen bg-[#1a1c22] text-white p-6">
    <h1 class="text-2xl font-bold mb-4">Mis Eventos</h1>
    <p class="mb-6">Aquí puedes ver, editar o eliminar tus eventos.</p>

    <!-- Lista de eventos -->
    <div
      v-for="event in events"
      :key="event.id"
      class="mb-4 bg-gradient-to-r from-[#1f1f2e] to-[#2c3e50] p-4 rounded shadow-lg transition-transform hover:scale-[1.01]"
    >
      <h2 class="text-xl font-bold mb-1">{{ event.title }}</h2>
      <p v-if="event.description" class="text-sm mb-1">{{ event.description }}</p>
      <p class="text-xs text-gray-300">
        <strong>Fecha:</strong> {{ formatDate(event.date) }}
      </p>
      <p v-if="event.location" class="text-xs text-gray-300">
        <strong>Ubicación:</strong> {{ event.location }}
      </p>
      <div class="flex space-x-2 mt-3">
        <!-- Botón Editar -->
        <button
          class="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition-colors"
          @click="openEditModal(event)"
        >
          Editar
        </button>
        <!-- Botón Eliminar -->
        <button
          class="bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition-colors"
          @click="promptDelete(event.id)"
        >
          Eliminar
        </button>
      </div>
    </div>

    <button
      class="mt-6 bg-[#2c3e50] px-4 py-2 rounded hover:bg-[#1a2530] transition-colors"
      @click="goBack"
    >
      Regresar
    </button>

    <!-- Modal de edición -->
    <EditEventModal
      v-if="showEditModal"
      :eventToEdit="eventToEdit"
      @close="closeEditModal"
      @updated="handleEventUpdated"
    />

    <!-- Modal de confirmación de eliminación -->
    <DeleteEventModal
      v-if="showDeleteModal"
      @confirm="handleDeleteConfirmed"
      @cancel="closeDeleteModal"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEvents } from '~/composables/useEvents'
import { useRouter, useRuntimeConfig } from '#imports'
import EditEventModal from '~/components/EditEventModal.vue'
import DeleteEventModal from '~/components/DeleteEventModal.vue'
import { useAuth } from '~/composables/useAuth'

const { events, fetchEvents } = useEvents()
const router = useRouter()
const { token } = useAuth()

// 1) Obtenemos la variable API_BASE
const { public: { API_BASE } } = useRuntimeConfig()

onMounted(() => {
  fetchEvents()
})

function formatDate(dateString: string) {
  const d = new Date(dateString)
  return d.toLocaleString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function goBack() {
  router.push('/')
}

// -- Modal de edición
const showEditModal = ref(false)
const eventToEdit = ref<any>(null)

function openEditModal(event: any) {
  eventToEdit.value = { ...event }
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
}

function handleEventUpdated() {
  fetchEvents()
  closeEditModal()
}

// -- Modal de eliminación
const showDeleteModal = ref(false)
const eventIdToDelete = ref<number | null>(null)

function promptDelete(eventId: number) {
  eventIdToDelete.value = eventId
  showDeleteModal.value = true
}

function closeDeleteModal() {
  showDeleteModal.value = false
  eventIdToDelete.value = null
}

async function handleDeleteConfirmed() {
  if (eventIdToDelete.value === null) return
  try {
    await $fetch(`/events/${eventIdToDelete.value}`, {
      method: 'DELETE',
      // 2) Usamos la baseURL con API_BASE
      baseURL: API_BASE,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })
    fetchEvents()
    closeDeleteModal()
  } catch (error) {
    console.error('Error al eliminar:', error)
    alert('Error al eliminar')
  }
}
</script>