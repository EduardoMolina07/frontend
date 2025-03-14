// composables/useSidebar.ts
import { ref } from 'vue'

const isSidebarOpen = ref(false) // Valor inicial: cerrado

export function useSidebar() {
  function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value
  }
  function closeSidebar() {
    isSidebarOpen.value = false
  }
  return {
    isSidebarOpen,
    toggleSidebar,
    closeSidebar
  }
}