<template>
  <div class="min-h-screen bg-[#1a1c22] text-white p-6">
    <h1 class="text-2xl font-bold mb-4">Ayuda y Comentarios</h1>

    <!-- Sección de FAQ -->
    <div class="bg-[#232830] p-4 rounded shadow-md mb-6">
      <h2 class="text-xl font-semibold mb-2">Preguntas Frecuentes</h2>
      <div class="mb-4">
        <h3 class="font-bold">¿Cómo creo un evento?</h3>
        <p class="text-sm">
          Dirígete a "Mis Eventos" y haz clic en "Agregar evento". Completa los datos y guarda.
        </p>
      </div>
      <div class="mb-4">
        <h3 class="font-bold">¿Cómo puedo editar o eliminar un evento?</h3>
        <p class="text-sm">
          En "Mis Eventos", encontrarás los botones "Editar" y "Eliminar" junto a cada evento.
        </p>
      </div>
      <div>
        <h3 class="font-bold">¿Olvidé mi contraseña, qué hago?</h3>
        <p class="text-sm">
          Ponte en contacto con soporte para restablecerla.
        </p>
      </div>
    </div>

    <!-- Sección de Feedback -->
    <div class="bg-[#232830] p-4 rounded shadow-md mb-6">
      <h2 class="text-xl font-semibold mb-2">¿Tienes comentarios o dudas?</h2>
      <p class="text-sm mb-4">Envíanos un mensaje para mejorar tu experiencia.</p>

      <form @submit.prevent="submitFeedback">
        <div class="mb-4">
          <label class="block mb-1">Asunto</label>
          <input
            v-model="subject"
            type="text"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1">Mensaje</label>
          <textarea
            v-model="message"
            class="w-full p-2 rounded bg-[#1a1c22] border border-gray-600"
            rows="5"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>

    <!-- Botón para regresar -->
    <NuxtLink
      to="/"
      class="inline-block bg-[#2c3e50] px-4 py-2 rounded hover:bg-[#1a2530] transition-colors"
    >
      Volver
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const subject = ref('')
const message = ref('')

function submitFeedback() {
  // Aquí podrías hacer un fetch a tu backend,
  // o simplemente mostrar un alert de agradecimiento.
  alert(`¡Gracias por tu comentario!\nAsunto: ${subject.value}\nMensaje: ${message.value}`)
  // Limpiar campos
  subject.value = ''
  message.value = ''
}
</script>

<style scoped>
/* Ajusta estilos a tu gusto */
</style>