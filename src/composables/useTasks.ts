import { ref } from 'vue'
import { TaskService } from '@/services/task.service'
import { useAlert } from './useAlert'
import type { Task } from '@/interfaces/task.interface'

export function useTasks() {
  const tasks = ref<Task[]>([])
  const loading = ref(false)

  const { open } = useAlert()

  // 🔹 Obtener todas las tareas
  const loadTasks = async () => {
    loading.value = true
    try {
      tasks.value = await TaskService.getAll()
    } catch (error) {
      console.error('Error cargando tareas', error)
      open('Error al cargar tareas', 'error')
    } finally {
      loading.value = false
    }
  }

  // 🔹 Crear tarea
  const createTask = async (title: string) => {
    try {
      await TaskService.create({ title })
      open('Tarea creada', 'success')
      await loadTasks()
    } catch (error) {
      console.error('Error creando tarea', error)
      open('Error al crear tarea', 'error')
    }
  }

  // 🔹 Cambiar estado (pendiente / finalizada)
  const toggleTask = async (id: number) => {
    try {
      await TaskService.toggleStatus(id)
      await loadTasks()
    } catch (error) {
      console.error('Error cambiando estado', error)
      open('Error al cambiar estado', 'error')
    }
  }

  // 🔹 Eliminar tarea
  const deleteTask = async (id: number) => {
    try {
      await TaskService.delete(id)
      open('Tarea eliminada', 'success')
      await loadTasks()
    } catch (error) {
      console.error('Error eliminando tarea', error)
      open('Error al eliminar tarea', 'error')
    }
  }

  return {
    tasks,
    loading,
    loadTasks,
    createTask,
    toggleTask,
    deleteTask,
  }
}
