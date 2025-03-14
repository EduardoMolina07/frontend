<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="closeModal"
  >
    <div class="bg-[#232830] w-full max-w-md p-6 rounded shadow-md text-white">
      <h2 class="text-2xl font-bold mb-4">Agregar Evento</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block mb-1">Título</label>
          <input
            v-model="title"
            type="text"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1">Descripción</label>
          <textarea
            v-model="description"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
          ></textarea>
        </div>

        <div class="mb-4">
          <label class="block mb-1">Fecha</label>
          <input
            v-model="date"
            type="datetime-local"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1">Ubicación</label>
          <input
            v-model="location"
            type="text"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
          />
        </div>

        <div class="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            class="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
            @click="closeModal"
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
import { ref } from 'vue'
import { useEvents } from '~/composables/useEvents'

// 1) Definimos los eventos que este modal emitirá
// - close => para que el padre cierre el modal
// - created => para avisar al padre que se creó un evento nuevo
const emit = defineEmits(['close', 'created'])

const title = ref('')
const description = ref('')
const date = ref('')
const location = ref('')

const { createEvent } = useEvents()

function closeModal() {
  emit('close') // Notificamos al padre que se cerró el modal
}

async function handleSubmit() {
  // Creamos el evento en el backend
  const newEvt = await createEvent({
    title: title.value,
    description: description.value,
    date: date.value,
    location: location.value
  })
  // Avisamos al padre que se creó un evento
  emit('created', newEvt)

  // Cerramos el modal
  closeModal()
}
</script>