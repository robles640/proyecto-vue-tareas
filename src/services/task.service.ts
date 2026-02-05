import api from '@/api/axios'

export const TaskService = {
  async getAll() {
    const { data } = await api.get('/tasks')
    return data
  },

  async create(payload: { title: string }) {
    const { data } = await api.post('/tasks', payload)
    return data
  },

  async update(id: number, payload: any) {
    const { data } = await api.put(`/tasks/${id}`, payload)
    return data
  },

  async toggleStatus(id: number) {
    const { data } = await api.patch(`/tasks/${id}`)
    return data
  },

  async delete(id: number) {
    const { data } = await api.delete(`/tasks/${id}`)
    return data
  },
}
