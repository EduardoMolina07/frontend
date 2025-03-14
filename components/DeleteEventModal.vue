<template>
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="cancel"
    >
      <div class="bg-[#232830] w-full max-w-sm p-6 rounded shadow-md text-white">
        <h2 class="text-2xl font-bold mb-4">Confirmar eliminación</h2>
        <p class="mb-6">¿Estás seguro de eliminar este evento?</p>
        <div class="flex justify-end space-x-2">
          <button 
            type="button" 
            class="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            @click="cancel"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            class="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
            @click="confirm"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineEmits } from 'vue'
  
  const emit = defineEmits(['confirm', 'cancel'])
  
  function confirm() {
    emit('confirm')
  }
  
  function cancel() {
    emit('cancel')
  }
  </script>
  
  <style scoped>

  </style>
  