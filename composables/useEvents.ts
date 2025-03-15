import { ref, onMounted } from 'vue'
// 1) Importa el runtimeConfig
import { useRuntimeConfig } from '#imports'
import { useAuth } from './useAuth'

interface EventData {
  id?: number
  title: string
  description?: string
  date: string
  location?: string
}

const events = ref<EventData[]>([])

export function useEvents() {
  // 2) Obtenemos la config pública (o privada, según tu caso)
  const { public: { API_BASE } } = useRuntimeConfig()
  const { token } = useAuth()

  onMounted(() => {
    fetchEvents()
  })

  async function fetchEvents() {
    try {
      // 3) Usamos API_BASE en baseURL
      const data = await $fetch<EventData[]>('/events', {
        baseURL: API_BASE,
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      events.value = data
    } catch (error) {
      console.error('Error al obtener eventos', error)
    }
  }

  async function createEvent(newEvent: EventData) {
    try {
      const created = await $fetch<EventData>('/events', {
        method: 'POST',
        baseURL: API_BASE,
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: newEvent
      })
      // Insertamos el evento en la lista
      events.value.push(created)
      // Re-ordenamos según la fecha
      events.value.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } catch (error) {
      console.error('Error al crear evento', error)
    }
  }

  return {
    events,
    fetchEvents,
    createEvent
  }
}