<template>
  <!-- Div contenedor principal (fondo semitransparente) -->
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <!-- Div interior (caja modal) -->
    <div class="bg-[#232830] w-full max-w-md p-6 rounded shadow-md text-white">
      <h2 class="text-2xl font-bold mb-4">Editar Evento</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block mb-1">Título</label>
          <input
            v-model="editedTitle"
            type="text"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1">Descripción</label>
          <textarea
            v-model="editedDescription"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block mb-1">Fecha</label>
          <input
            v-model="editedDate"
            type="datetime-local"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1">Ubicación</label>
          <input
            v-model="editedLocation"
            type="text"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
          />
        </div>

        <div class="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            class="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
            @click="close"
          >
            Cancelar
          </button>
          <button
            type="submit"
            class="bg-[#2c3e50] px-6 py-2 rounded text-lg hover:bg-[#1a2530] transition-colors"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'

const props = defineProps({
  eventToEdit: {
    type: Object,
    default: null
  }
})
const emit = defineEmits(['close', 'updated'])

// Importamos token para enviar en la petición PUT
const { token } = useAuth()

// Variables locales para los campos
const editedTitle = ref('')
const editedDescription = ref('')
const editedDate = ref('')
const editedLocation = ref('')

// Rellenar los campos cuando eventToEdit cambia
watch(
  () => props.eventToEdit,
  (newVal) => {
    if (newVal) {
      editedTitle.value = newVal.title
      editedDescription.value = newVal.description || ''
      const d = new Date(newVal.date)
      editedDate.value = d.toISOString().slice(0, 16) // "YYYY-MM-DDTHH:MM"
      editedLocation.value = newVal.location || ''
    }
  },
  { immediate: true }
)

function close() {
  emit('close')
}

async function handleSubmit() {
  try {
    await $fetch(`/events/${props.eventToEdit.id}`, {
      method: 'PUT',
      baseURL: 'http://localhost:4500',
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      body: {
        title: editedTitle.value,
        description: editedDescription.value,
        date: editedDate.value,
        location: editedLocation.value
      }
    })
    emit('updated')
  } catch (error) {
    console.error('Error al editar:', error)
    alert('Error al editar')
  }
}
</script>