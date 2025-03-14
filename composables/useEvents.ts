import { ref, onMounted } from 'vue'
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
  const { token } = useAuth()

  onMounted(() => {
    fetchEvents()
  })

  async function fetchEvents() {
    try {
      const data = await $fetch<EventData[]>('/events', {
        baseURL: 'http://localhost:4500',
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
        baseURL: 'http://localhost:4500',
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        body: newEvent
      })
      // Insertamos el evento en la lista, en la posición correspondiente
      events.value.push(created)
      // Re-ordenamos para que quede en orden
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